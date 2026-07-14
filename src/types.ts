/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BiometricMetrics {
  hrv: number;          // Heart Rate Variability (ms)
  restingHeartRate: number; // bpm
  sleepScore: number;   // 0-100
  vo2Max: number;       // ml/kg/min
  cnsRecovery: number;  // 0-100%
  activeCalories: number;
}

export interface TrainingSession {
  id: string;
  type: string;
  duration: number; // minutes
  intensity: 'Low' | 'Medium' | 'High' | 'Elite';
  time: string;
  status: 'Scheduled' | 'Completed' | 'Skipped';
}

export interface Coach {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialty: string;
  avatar: string;
  availableHours: string[];
}

export interface CohortApplication {
  fullName: string;
  email: string;
  athleticBackground: string;
  trainingFrequency: string; // "3-4 times/week", "5-6 times/week", "Daily", "Multiple times/day"
  primaryGoal: string;
  wearableDevice: string;
  submittedAt: string;
  status: 'Under Review' | 'Wearable Syncing' | 'Interview Scheduled' | 'Approved';
  assignedTier?: string; // "APEX ALPHA", "VELO APEX", "NANO PRO"
}

export interface RecoveryProtocol {
  id: string;
  name: string;
  duration: number; // minutes
  temperature: string;
  intensity: string;
  cnsDelta: number; // estimated CNS recovery improvement percentage
  status: 'Idle' | 'Active' | 'Completed';
}

export interface FuelScheduleItem {
  timeOffset: string; // e.g., "-120 mins", "-30 mins", "Intra-workout", "+45 mins"
  type: 'Carbs' | 'Protein' | 'Electrolytes' | 'Amino Acids' | 'Hydration';
  substance: string;
  dosage: string;
  purpose: string;
}
