/**
 * We have relatively simple deep merging requirements in this package.
 * We are only ever merging messages config, so we know the structure,
 * we know there are no arrays, and we know there are no constructors
 * or weirdly defined properties.
 *
 * Thus, we can write a very simplistic deep merge function to avoid
 * pulling in a large dependency.
 */

export default function merge(destination, ...sources) {
  sources.forEach((source) => {
    Object.keys(source).forEach((prop) => {
      if (
        source[prop]
        && source[prop].constructor
        && source[prop].constructor === Object
      ) {
        destination[prop] = destination[prop] || {};
        merge(destination[prop], source[prop]);
      } else {
        destination[prop] = source[prop];
      }
    });
  });

  return destination;
}