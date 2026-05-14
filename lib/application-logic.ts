export type DegreeLevel = "Diploma" | "Bachelor" | "Masters" | "PhD";

export function requiredDocuments(nationality: string, degreeLevel: DegreeLevel, hasALevel = true) {
  const country = nationality.trim().toLowerCase();
  if (country === "tanzania") {
    if (degreeLevel === "Diploma" || degreeLevel === "Bachelor") {
      return hasALevel
        ? ["Passport photo", "Passport scan", "O-Level Certificate (CSEE)", "A-Level Certificate (ACSEE)"]
        : ["Passport photo", "Passport scan", "O-Level Certificate (CSEE)", "Diploma Certificate"];
    }
    if (degreeLevel === "Masters") return ["Bachelor Degree", "Transcript", "Passport scan"];
    return ["Masters Degree", "Research Proposal", "CV", "Passport scan"];
  }

  const base = ["Passport photo", "Passport scan", "Academic certificates", "Transcript"];
  if (degreeLevel === "Masters") return [...base, "Bachelor Degree", "CV"];
  if (degreeLevel === "PhD") return [...base, "Masters Degree", "Research Proposal", "CV"];
  return base;
}
