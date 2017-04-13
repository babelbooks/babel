import { Achievement } from './achievement.interface';

export type ID = number;

export interface Badge {
  /**
   * The badge's unique ID.
   */
  id: ID;

  /**
   * The badge's name.
   */
  name: string;

  /**
   * A quick description of the reward.
   */
  description: string;

  /**
   * URL to the badge's picture.
   */
  pictureUrl: string;

  /**
   * The list of achievements needed to unlock this badge.
   */
  neededAchievements: Achievement[];
}