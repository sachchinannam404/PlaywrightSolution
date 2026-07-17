import type { UserPersona } from '../personas/persona';

export interface UserCredentials {
  readonly username: string;
  readonly password: string;
}

export function resolveCredentials(persona: UserPersona, countryCode: string): UserCredentials {
  const prefix = `RETURNS_${countryCode.toUpperCase()}_${persona.toUpperCase()}`;
  const username = process.env[`${prefix}_USERNAME`] ?? process.env[`RETURNS_${persona.toUpperCase()}_USERNAME`];
  const password = process.env[`${prefix}_PASSWORD`] ?? process.env[`RETURNS_${persona.toUpperCase()}_PASSWORD`];

  if (!username || !password) {
    throw new Error(`Missing credentials for ${persona} in ${countryCode}. Set ${prefix}_USERNAME/${prefix}_PASSWORD or shared RETURNS_${persona.toUpperCase()}_USERNAME/RETURNS_${persona.toUpperCase()}_PASSWORD.`);
  }

  return { username, password };
}
