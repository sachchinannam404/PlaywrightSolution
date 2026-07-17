# PlaywrightSolution Automation Framework

This repository provides a base Playwright automation framework for a Returns application. The framework is intentionally layered so teams can add new business flows without coupling tests to page details or country-specific setup.

## Goals

- Support external users, including resellers and customers.
- Support internal users, including associates.
- Scale test execution across multiple countries with country-specific URLs, locales, currencies, and feature flags.
- Keep tests readable by placing page interactions in page objects and business flows in workflow classes.

## Project structure

```text
src/config        Country and credential resolution
src/fixtures      Playwright fixtures that compose country, persona, pages, and workflows
src/pages         Page objects for reusable UI interactions
src/personas      External and internal persona definitions
src/workflows     Business-level Returns flows
tests/returns     Spec files for Returns use cases
```

## Scaling to countries

Add countries in `src/config/countries.ts`. Each country can define its own base URL, locale, currency, and feature flags. Run one or many countries with environment variables:

```bash
COUNTRY=US npm test
COUNTRIES=US,CA,GB npm test
```

## Scaling to user types

Personas are defined in `src/personas/persona.ts`. The current base includes:

- `customer` for external customer journeys.
- `reseller` for external reseller journeys.
- `associate` for internal associate journeys.

Run selected personas with:

```bash
PERSONAS=customer,reseller npm test
PERSONAS=associate npm test
```

## Credentials

Credentials are read from environment variables. Prefer country-specific values when users differ by market:

```bash
RETURNS_US_CUSTOMER_USERNAME=user@example.com
RETURNS_US_CUSTOMER_PASSWORD=secret
```

Shared persona credentials are also supported:

```bash
RETURNS_CUSTOMER_USERNAME=user@example.com
RETURNS_CUSTOMER_PASSWORD=secret
```
