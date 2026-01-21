import { Documentation } from "./types";

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const methodDoc: Readonly<Documentation> = {
  duration: {
    doc:
      "Globally available duration functions. These functions are accessed using the `duration.` prefix.",
    childs: {
      abs: {
        header: "abs(duration) returns rules.Duration",
        doc: "Absolute value of a duration.",
      },
      time: {
        header: "time(hours, mins, secs, nanos) returns rules.Duration",
        doc: "Create a duration from hours, minutes, seconds, and nanoseconds.",
      },
      value: {
        header: "value(magnitude, unit) returns rules.Duration",
        doc: "Create a duration from a numeric magnitude and string unit.",
      },
    },
  },
  latlng: {
    doc:
      "Globally available latitude-longitude functions. These functions are accessed using the `latlng.` prefix.",
    childs: {
      value: {
        header: "value(lat, lng) returns rules.LatLng",
        doc: "Create a LatLng from floating point coordinates.",
      },
      distance: {
        header: "LatLng#distance(other) returns rules.Number",
        doc: "Return the distance between this LatLng and another LatLng.",
      },
      latitude: {
        header: "LatLng#latitude() returns rules.Number",
        doc: "Get the latitude component of this LatLng.",
      },
      longitude: {
        header: "LatLng#longitude() returns rules.Number",
        doc: "Get the longitude component of this LatLng.",
      },
    },
  },
  bytes: {
    doc: "Utilities for working with bytes.",
    childs: {
      size: {
        header: "bytes.size() returns rules.Integer",
        doc: "Return the number of bytes.",
      },
      toBase64: {
        header: "bytes.toBase64() returns rules.String",
        doc: "Encode bytes as a Base64 string.",
      },
      toHexString: {
        header: "bytes.toHexString() returns rules.String",
        doc: "Encode bytes as a hexadecimal string.",
      },
    },
  },
  list: {
    doc: "Functions for operating on lists.",
    childs: {
      concat: {
        header: "list.concat(list1, list2) returns rules.List",
        doc: "Concatenate two lists.",
      },
      hasAll: {
        header: "list.hasAll(list, subset) returns rules.Boolean",
        doc: "Check whether a list contains all elements of another list.",
      },
      hasAny: {
        header: "list.hasAny(list, other) returns rules.Boolean",
        doc: "Check whether a list contains any elements of another list.",
      },
      hasOnly: {
        header: "list.hasOnly(list, allowed) returns rules.Boolean",
        doc: "Check whether a list contains only allowed elements.",
      },
      join: {
        header: "list.join(list, separator) returns rules.String",
        doc:
          "Join the elements of a list into a string separated by `separator`.",
      },
      removeAll: {
        header: "list.removeAll(list, items) returns rules.List",
        doc: "Remove a set of items from a list.",
      },
      size: {
        header: "list.size() returns rules.Integer",
        doc: "Return the size of the list.",
      },
      toSet: {
        header: "list.toSet(list) returns rules.Set",
        doc: "Convert a list to a set.",
      },
    },
  },
  map: {
    doc: "Functions for operating on maps.",
    childs: {
      diff: {
        header: "map.diff(mapA, mapB) returns rules.MapDiff",
        doc: "Compute the difference between two maps.",
      },
      get: {
        header: "map.get(map, key) returns any",
        doc: "Get a value from a map by key.",
      },
      keys: {
        header: "map.keys(map) returns rules.List",
        doc: "Return the keys of a map as a list.",
      },
      size: {
        header: "map.size() returns rules.Integer",
        doc: "Return the number of entries in the map.",
      },
      values: {
        header: "map.values(map) returns rules.List",
        doc: "Return the values of a map as a list.",
      },
    },
  },
  mapDiff: {
    doc: "Representation of differences between maps.",
    childs: {
      addedKeys: {
        header: "MapDiff#addedKeys() returns rules.List",
        doc: "Keys that were added in the difference.",
      },
      affectedKeys: {
        header: "MapDiff#affectedKeys() returns rules.List",
        doc: "Keys that are affected by the difference.",
      },
      changedKeys: {
        header: "MapDiff#changedKeys() returns rules.List",
        doc: "Keys whose values changed.",
      },
      removedKeys: {
        header: "MapDiff#removedKeys() returns rules.List",
        doc: "Keys that were removed in the difference.",
      },
      unchangedKeys: {
        header: "MapDiff#unchangedKeys() returns rules.List",
        doc: "Keys that remain unchanged.",
      },
    },
  },
  set: {
    doc: "Functions for operating on sets.",
    childs: {
      difference: {
        header: "set.difference(a, b) returns rules.Set",
        doc: "Return elements in `a` that are not in `b`.",
      },
      hasAll: {
        header: "set.hasAll(set, subset) returns rules.Boolean",
        doc: "Check whether the set contains all elements of another set.",
      },
      hasAny: {
        header: "set.hasAny(set, other) returns rules.Boolean",
        doc: "Check whether the set contains any elements of another set.",
      },
      hasOnly: {
        header: "set.hasOnly(set, allowed) returns rules.Boolean",
        doc: "Check whether the set contains only allowed elements.",
      },
      intersection: {
        header: "set.intersection(a, b) returns rules.Set",
        doc: "Return the intersection of two sets.",
      },
      size: {
        header: "set.size() returns rules.Integer",
        doc: "Return the size of the set.",
      },
      union: {
        header: "set.union(a, b) returns rules.Set",
        doc: "Return the union of two sets.",
      },
    },
  },
  string: {
    doc: "Functions for operating on strings.",
    childs: {
      lower: {
        header: "string.lower() returns rules.String",
        doc: "Return the lowercase version of the string.",
      },
      matches: {
        header: "string.matches(pattern) returns rules.Boolean",
        doc: "Return true if the string matches the given regular expression.",
      },
      replace: {
        header: "string.replace(pattern, replacement) returns rules.String",
        doc: "Replace occurrences that match `pattern` with `replacement`.",
      },
      size: {
        header: "string.size() returns rules.Integer",
        doc: "Return the number of characters in the string.",
      },
      split: {
        header: "string.split(separator) returns rules.List",
        doc: "Split the string using the separator and return a list.",
      },
      toUtf8: {
        header: "string.toUtf8() returns rules.Bytes",
        doc: "Return the UTF-8 encoding of the string.",
      },
      trim: {
        header: "string.trim() returns rules.String",
        doc: "Return the string with leading and trailing whitespace removed.",
      },
      upper: {
        header: "string.upper() returns rules.String",
        doc: "Return the uppercase version of the string.",
      },
    },
  },
  path: {
    doc: "Utilities for working with resource paths.",
    childs: {
      bind: {
        header: "path.bind(bindings) returns rules.Path",
        doc: "Bind variables in a path to produce a concrete `Path` instance.",
      },
    },
  },

  exists: {
    header: "exists(path) returns rules.Boolean",
    doc: "Check if a document exists.",
  },
  existsAfter: {
    header: "existsAfter(path) returns rules.Boolean",
    doc:
      "Check if a document exists, assuming the current request succeeds. Equivalent to getAfter(path) != null.",
  },
  get: {
    header: "get(path) returns rules.firestore.Resource",
    doc: "Get the contents of a firestore document.",
  },
  getAfter: {
    header: "getAfter(path) returns rules.firestore.Resource",
    doc:
      "Get the projected contents of a document. The document is returned as if the current request had succeeded. Useful for validating documents that are part of a batched write or transaction.",
  },
  math: {
    doc:
      "Globally available mathematical functions. These functions are accessed using the `math.` prefix and operate on numerical values.",
    childs: {
      abs: {
        header: "(num: number) => rules.Integer",
        doc: "Absolute value of a numeric value.",
      },
      ceil: {
        header: "(num: number) => rules.Integer",
        doc: "Ceiling of the numeric value.",
      },
      floor: {
        header: "(num: number) => rules.Integer",
        doc: "Ceiling of the numeric value.",
      },
      isInfinite: {
        header: "(num: number) => rules.Boolean",
        doc: "Test whether the value is ±∞.",
      },
      isNaN: {
        header: "(num: number) => rules.Boolean",
        doc: "Test whether the value is NaN.",
      },
      round: {
        header: "(num: number) => rules.Integer",
        doc: "Round the input value to the nearest int.",
      },
      pow: {
        header: "(base: number, exponent: number) => rules.Number",
        doc: "Base raised to the exponent power.",
      },
      sqrt: {
        header: "(num: number) => rules.Number",
        doc: "Square root of the input value.",
      },
    },
  },
  timestamp: {
    doc:
      "Globally available timestamp functions. These functions are accessed using the `timestamp.` prefix.",
    childs: {
      date: {
        header: "date(year, month, day) returns rules.Timestamp",
        doc: "Make a timestamp from a year, month, and day.",
      },
      value: {
        header: "value(epochMillis) returns rules.Timestamp",
        doc: "Make a timestamp from an epoch time in milliseconds.",
      },
      day: {
        header: "timestamp.day() returns rules.Integer",
        doc: "The day of the month for this timestamp.",
      },
      dayOfWeek: {
        header: "timestamp.dayOfWeek() returns rules.Integer",
        doc: "The day of week for this timestamp (1-7).",
      },
      dayOfYear: {
        header: "timestamp.dayOfYear() returns rules.Integer",
        doc: "The day of year for this timestamp (1-365/366).",
      },
      hours: {
        header: "timestamp.hours() returns rules.Integer",
        doc: "The hour component of this timestamp.",
      },
      minutes: {
        header: "timestamp.minutes() returns rules.Integer",
        doc: "The minutes component of this timestamp.",
      },
      month: {
        header: "timestamp.month() returns rules.Integer",
        doc: "The month component of this timestamp (1-12).",
      },
      nanos: {
        header: "timestamp.nanos() returns rules.Integer",
        doc: "The nanoseconds component of this timestamp.",
      },
      seconds: {
        header: "timestamp.seconds() returns rules.Integer",
        doc: "The seconds component of this timestamp.",
      },
      time: {
        header: "timestamp.time() returns rules.String",
        doc: "A string representation of the time portion of this timestamp.",
      },
      toMillis: {
        header: "timestamp.toMillis() returns rules.Integer",
        doc: "Return the timestamp as milliseconds since the epoch.",
      },
      year: {
        header: "timestamp.year() returns rules.Integer",
        doc: "The year component of this timestamp.",
      },
    },
  },
  hashing: {
    doc:
      "Globally available hashing functions. These functions are accessed using the `hashing.` prefix.",
    childs: {
      md5: {
        header: "md5(input) returns rules.Bytes",
        doc: "Calculate the MD5 hash of the input bytes or string.",
      },
      sha256: {
        header: "sha256(input) returns rules.Bytes",
        doc: "Calculate the SHA-256 hash of the input bytes or string.",
      },
      crc32: {
        header: "crc32(input) returns rules.Integer",
        doc: "Calculate the CRC32 checksum of the input bytes or string.",
      },
      crc32c: {
        header: "crc32c(input) returns rules.Integer",
        doc: "Calculate the CRC32C checksum of the input bytes or string.",
      },
    },
  },
  request: {
    doc:
      "The request variable contains information about the incoming request.",
    childs: {
      auth: {
        doc:
          "Information about the authenticated user making the request. Null if the request is unauthenticated.",
        childs: {
          uid: {
            header: "request.auth.uid returns rules.String",
            doc: "The user ID of the authenticated user.",
          },
          token: {
            header: "request.auth.token returns rules.Map",
            doc:
              "The authentication token of the authenticated user, containing their claims.",
          },
        },
      },
      time: {
        header: "request.time returns rules.Timestamp",
        doc: "The timestamp of the request.",
      },
      method: {
        header: "request.method returns rules.String",
        doc: "The HTTP method of the request (e.g., 'get', 'list', 'create').",
      },
      resource: {
        header: "request.resource returns rules.firestore.Resource",
        doc:
          "The resource as it will appear if the request is allowed. For write operations, this contains the incoming document data.",
      },
    },
  },
  debug: {
    doc: "Functions for debugging purposes.",
    childs: {
      print: {
        header: "debug.print(value) returns rules.Null",
        doc:
          "Prints the given value to the server logs for debugging purposes. Always returns null.",
      },
    },
  },
};
