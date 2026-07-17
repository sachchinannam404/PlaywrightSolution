export type UserChannel = 'external' | 'internal';

export type UserPersona = 'reseller' | 'customer' | 'associate';

export interface PersonaProfile {
  readonly persona: UserPersona;
  readonly channel: UserChannel;
  readonly description: string;
}

export const personas: Record<UserPersona, PersonaProfile> = {
  reseller: {
    persona: 'reseller',
    channel: 'external',
    description: 'External reseller submitting and tracking returns for their business.',
  },
  customer: {
    persona: 'customer',
    channel: 'external',
    description: 'External customer creating returns and checking return status.',
  },
  associate: {
    persona: 'associate',
    channel: 'internal',
    description: 'Internal associate reviewing, approving, or supporting returns.',
  },
};
