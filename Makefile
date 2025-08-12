# Makefile for OpenAPI documentation workflow

.PHONY: openapi-docs openapi-lint openapi-bundle openapi-build openapi-clean orval-generate openapi-full help

# Default target
help:
	@echo "Available commands:"
	@echo "  openapi-full   - Complete workflow: lint, bundle, build docs and generate types"
	@echo "  openapi-docs   - Lint, bundle OpenAPI files and build documentation"
	@echo "  openapi-lint   - Lint OpenAPI files for errors and warnings"
	@echo "  openapi-bundle - Bundle OpenAPI files from docs/openapi/ to docs/openapi.gen.yml"
	@echo "  openapi-build  - Build HTML documentation from bundled OpenAPI file"
	@echo "  orval-generate - Generate TypeScript types and Zod schemas from OpenAPI"
	@echo "  openapi-clean  - Clean generated OpenAPI files"

# Complete workflow: lint, bundle, build docs and generate types
openapi-full: openapi-lint openapi-bundle openapi-build orval-generate
	@echo "Complete OpenAPI workflow completed!"
	@echo "[OK] Linted OpenAPI files"
	@echo "[OK] Bundled OpenAPI files"
	@echo "[OK] Built HTML documentation"
	@echo "[OK] Generated TypeScript types and Zod schemas"

# Lint, bundle and build documentation in one command
openapi-docs: openapi-lint openapi-bundle openapi-build
	@echo "OpenAPI documentation workflow completed!"

# Lint OpenAPI files
openapi-lint:
	@echo "Linting OpenAPI files..."
	pnpm redoc:lint

# Bundle OpenAPI files
openapi-bundle:
	@echo "Bundling OpenAPI files..."
	pnpm redoc:bundle

# Build HTML documentation
openapi-build:
	@echo "Building OpenAPI HTML documentation..."
	pnpm redoc:build:docs

# Generate TypeScript types and Zod schemas
orval-generate:
	@echo "Generating TypeScript types and Zod schemas..."
	pnpm orval:generate

# Clean generated files
openapi-clean:
	@echo "Cleaning generated OpenAPI files..."
	@if exist docs\openapi.gen.yml del docs\openapi.gen.yml
	@if exist docs\redoc_static.html del docs\redoc_static.html
	@if exist src\presentation\generated\schemas.ts del src\presentation\generated\schemas.ts
	@if exist src\presentation\generated\types rmdir /s /q src\presentation\generated\types
