export class NameCounter {
  // counts same pet names: {"William": 11, "Floyd": 2}
  count(names: Array<string | undefined | null>): Record<string, number> {
    return names
      .filter((n): n is string => typeof n === 'string' && n.trim().length > 0)
      .reduce<Record<string, number>>((acc, name) => {
        acc[name] = (acc[name] ?? 0) + 1;
        return acc;
      }, {});
  }
}