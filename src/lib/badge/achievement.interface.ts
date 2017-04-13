export type ID = number;

export interface Achievement {
  /**
   * The achievement's unique ID.
   */
  id: ID;

  /**
   * The achievement's name.
   */
  name: string;

  /**
   * A quick description of the achievement.
   */
  description: string;
}