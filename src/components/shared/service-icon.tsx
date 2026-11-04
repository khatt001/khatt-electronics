import {
  BellRing,
  ClipboardCheck,
  Cylinder,
  DoorOpen,
  Droplets,
  Fan,
  FileSignature,
  FireExtinguisher,
  HardHat,
  PackageCheck,
  ScanSearch,
  ShieldCheck,
  ShowerHead,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { ServiceId } from "@/data/fire-services";

export const serviceIcons: Record<ServiceId, LucideIcon> = {
  alarm: BellRing,
  sprinkler: ShowerHead,
  gas: Cylinder,
  evacuation: DoorOpen,
  smoke: Fan,
  hydrants: Droplets,
  extinguishers: FireExtinguisher,
  maintenance: Wrench,
  construction: HardHat,
};

/** One icon per process step, in the same order as processSteps */
export const stepIcons: LucideIcon[] = [
  ScanSearch,
  FileSignature,
  PackageCheck,
  Wrench,
  ClipboardCheck,
  ShieldCheck,
];
