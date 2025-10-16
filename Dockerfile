# Build stage
FROM node:23-alpine AS builder

WORKDIR /app

# Enable Corepack; pnpm version is pinned by package.json: "packageManager"
RUN corepack enable

# Copy lockfile and manifest first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Ensure the pinned pnpm is fetched
RUN pnpm --version

# Install deps (dev deps included for build)
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Prune dev dependencies for production runtime
RUN pnpm prune --prod

# Production stage
FROM node:23-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nextjs

# Copy package.json first so Corepack can resolve the pinned pnpm version
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Enable Corepack and fetch pinned pnpm for runtime
RUN corepack enable && pnpm --version

# Copy only what's needed to run
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./

USER nextjs

EXPOSE 3000
CMD ["pnpm", "start"]