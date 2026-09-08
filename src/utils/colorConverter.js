export function convertAdminColours(colours) {
  return colours.map((c) => ({
    id: c.id,
    type: "color",
    color: c.hex,
    isFree: true,
  }));
}
