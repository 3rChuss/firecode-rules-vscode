import { MarkdownString } from "vscode";
import { Documentation } from "./types";

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const methodDoc: Readonly<Documentation> = {
  duration: {
    doc:
      "Globally available duration functions. These functions are accessed using the `duration.` prefix.",
    childs: {
      nanos: {
        header: "nanos() returns rules.Duration",
        doc:
          "Get the nanoseconds portion (signed) of the duration from -999,999,999 to +999,999,999 inclusive.",
      },
      seconds: {
        header: "seconds() returns rules.Duration",
        doc:
          "Get the seconds portion (signed) of the duration from -315,576,000,000 to +315,576,000,000 inclusive.",
      },
    },
  },
  latlng: {
    doc:
      "Globally available latitude-longitude functions. These functions are accessed using the `latlng.` prefix.",
    childs: {
      distance: {
        header: "LatLng#distance(other) returns non-null rules.Number",
        doc: "Return the distance between this LatLng and another LatLng.",
      },
      latitude: {
        header: "LatLng#latitude() returns non-null rules.Number",
        doc: "Get the latitude value in the range [-90.0, 90.0].",
      },
      longitude: {
        header: "LatLng#longitude() returns non-null rules.Number",
        doc: "Get the longitude value in the range [-180.0, 180.0].",
      },
    },
  },
  bytes: {
    doc: "Type representing a sequence of bytes.",
    childs: {
      size: {
        header: "bytes.size() returns non-null rules.Integer",
        doc: "Return the number of bytes.",
      },
      toBase64: {
        header: "bytes.toBase64() returns rules.String",
        doc: new MarkdownString(`
          Returns the Base64-encoded string corresponding to the provided Bytes sequence. \n\n
          Base64 encoding is performed per the base64url specification [base64url specification](https://datatracker.ietf.org/doc/html/rfc4648#page-7) \n\n
          Example usage: 
          \`\`\`ts
            b'\xFB\xEF\xBE'.toBase64() == '----'
          \`\`\`
        `),
      },
      toHexString: {
        header: "bytes.toHexString() returns rules.String",
        doc:
          "Returns the hexadecimal-encoded string corresponding to the provided Bytes sequence.",
      },
    },
  },
  list: {
    doc: new MarkdownString(`
      Functions for operating on lists. \n\n
      A list is an ordered collection of values, which may be of mixed types. \n\n
      **List Operators:**\n\n
      | Operator | Usage | Description |
      |---|---|---|
      | \`x == y\` | Compare lists | Compare lists x and y for equality |
      | \`x[i]\` | Index operator | Get value at index i |
      | \`x[i:j]\` | Range operator | Get sublist from index i to j |
      | \`v in x\` | Membership check | Check if value v exists in list x |
      
      Example: \`'a' in ['a','b'] == true\`
    `),
    childs: {
      concat: {
        header: "list.concat(list1, list2) non-null returns rules.List",
        doc:
          "Create a new list by adding the elements of another list to the end of this list.",
      },
      hasAll: {
        header: "list.hasAll(list, subset) non-null returns rules.Boolean",
        doc:
          "Determine whether the list contains all elements in another list.",
      },
      hasAny: {
        header: "list.hasAny(list, other) non-null returns rules.Boolean",
        doc: "Determine whether the list contains any element in another list.",
      },
      hasOnly: {
        header: "list.hasOnly(list, allowed) non-null returns rules.Boolean",
        doc: new MarkdownString(`
          Determine whether all elements in the list are present in another list. \n\n
          Example: \n\n
          \`\`\`ts
            ['a', 'b'].hasOnly(['a', 'c']) == false
            ['a', 'b'].hasOnly(['a', 'b', 'c']) == true
            ['a', 'b'].hasOnly(['b', 'a']) == true
            ['a', 'a', 'b'].hasOnly(['a', 'b', 'b']) == true
            ['a', 'a', 'b'].hasOnly(['a', 'b', 'b', 'c']) == true
          \`\`\`
        `),
      },
      join: {
        header: "list.join(list, separator) returns rules.String",
        doc:
          "Join the elements of a list into a string separated by `separator`.",
      },
      removeAll: {
        header: "list.removeAll(list, items) non-null returns rules.List",
        doc:
          "Create a new list by removing the elements of another list from this list.",
      },
      size: {
        header: "list.size() non-null returns rules.Integer",
        doc: "Return the size of the list.",
      },
      toSet: {
        header: "list.toSet(list) returns rules.Set",
        doc: new MarkdownString(`
          Returns a set containing all unique elements in the list. \n\n
          In case that two or more elements are equal but non-identical, the result set will only contain the first element in the list. The remaining elements are discarded.
        `),
      },
    },
  },
  map: {
    doc: new MarkdownString(`
      Functions for operating on maps. A map type is used for simple key-value mappings. \n\n
      Keys must be of type \`rules.String\`. \n\n
      **Map Operators:**\n\n
      | Operator | Usage | Description |
      |---|---|---|
      | \`x == y\` | Compare maps | Compare maps x and y for equality |
      | \`x[k]\` | Index operator | Get value at key name k |
      | \`x.k\` | Dot notation | Get value at key name k |
      | \`k in x\` | Membership check | Check if key k exists in map x |
    `),
    childs: {
      diff: {
        header: "map.diff(mapA, mapB) returns non-null rules.MapDiff",
        doc: "Compute the difference between two maps.",
      },
      get: {
        header: "map.get(map, key, default_value) returns any",
        doc: new MarkdownString(`
          Returns the value associated with a given search key string. \n\n
          For nested Maps involving keys and sub-keys, returns the value associated with a given sub-key string. The sub-key is identified using a list, the first item of which is a top-level key and the last item the sub-key whose value is to be looked up and returned. \n\n
          The function requires a default value to return if no match to the given search key is found. \n\n
          **Parameters:**\n\n
          * \`key\` — (\`non-null rules.String\` or \`non-null rules.List\`) Either a key specified as a string, or for nested Maps, a sub-key specified using list syntax.\n
          * \`default_value\` — Value to return if the Map does not contain the given search key. Can be any Rules language type.\n\n
          **Returns:**\n\n
          Value corresponding to the given key, or the default return value if no match is found. Since Map contents are user-defined, the data type can be any Rules language type. \n\n
          **Examples:**\n\n
          \`\`\`ts
            // "c" is not a key, returns default value 7
            {"a": 3,"b": 2}.get("c", 7) == 7
            
            // Default result can be any type, e.g. a list
            {"a": [2, 7], "b": [9, 12]}.get("c", [1, 1]) == [1, 1]
            
            // Return a list on successful match
            {"a": [2, 7],"b": [9, 12]}.get("b", [1, 1]) == [9, 12]
            
            // For nested Maps, use list ["a", "b"] to specify lookup on sub-key "b"
            {"a": {"b": 1},"c": 2}.get(["a", "b"], 7) == 1
          \`\`\`
        `),
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
    doc:
      "The MapDiff type represents the result of comparing two rules.Map objects.",
    childs: {
      addedKeys: {
        header: "MapDiff#addedKeys() returns non-null rules.List",
        doc: new MarkdownString(`
          Returns a rules.Set, which lists any keys that the Map calling diff() contains that the Map passed to diff() does not. \n\n
          Example: \n\n
          \`\`\`ts
          {"a":1}.diff({}).addedKeys() == ["a"].toSet()
          \`\`\`
        `),
      },
      affectedKeys: {
        header: "MapDiff#affectedKeys() returns non-null rules.List",
        doc: new MarkdownString(`
          Returns a rules.Set, which lists any keys that have been added to, removed from or modified from the Map calling diff() compared to the Map passed to diff(). \n\n
          This function returns the set equivalent to the combined results of MapDiff.addedKeys(), MapDiff.removedKeys() and MapDiff.changedKeys().
          Example: \n\n
          \`\`\`ts
          ({"a":0, "c":0, "u":0}).diff({"r":0, "c":1, "u": 0}).affectedKeys() ==
            ["a", "r", "c"].toSet()
          \`\`\`
        `),
      },
      changedKeys: {
        header: "MapDiff#changedKeys() returns non-null rules.List",
        doc: new MarkdownString(`
          Returns a rules.Set, which lists any keys that appear in both the Map calling diff() and the Map passed to diff(), but whose values are not equal. \n\n
          Example: \n\n
          \`\`\`ts
          {"a":0}.diff({"a":1, "b":4}).changedKeys() == ["a"].toSet()
          \`\`\`
        `),
      },
      removedKeys: {
        header: "MapDiff#removedKeys() returns non-null rules.List",
        doc: "Keys that were removed in the difference.",
      },
      unchangedKeys: {
        header: "MapDiff#unchangedKeys() returns non-null rules.List",
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
    doc: new MarkdownString(`
      Directory-like pattern for the location of a resource. Paths can be created in two ways. The first is in the "raw" form beginning with a forward slash /: \n\n
      \`\`\`ts
      /path/to/resource
      \`\`\`
      The second is by converting from a string using the path() function:
      \`\`\`ts
      path("path/to/resource")
      \`\`\`
      In addition to the methods listed below, paths have the following operators:\n\n
      | Operator | Usage | Description |
      |---|---|---|
      | x == y | Compare paths | Compare paths x and y for equality |
      | x[f] | Index operator | Get value at binding field name f |
      | x[i] | Index operator | Get value at numeric index i |
      | x.f | Dot notation | Get value at binding field name f |
    `),
    childs: {
      bind: {
        header: "path.bind(bindings) returns rules.Path",
        doc: new MarkdownString(`
          Bind key-value pairs in a map to a path. \n\n
          **Example:**\n\n
          \`\`\`ts
            // Make the path '/path/something/another' by binding a map
            (/path/$(foo)/$(bar)).bind({"foo": "something", "bar": "another"})
          \`\`\`
        `),
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
            childs: {
              email: {
                header: "request.auth.token.email returns rules.String",
                doc: "The email address of the authenticated user.",
              },
              email_verified: {
                header:
                  "request.auth.token.email_verified returns rules.Boolean",
                doc: "Whether the user's email address has been verified.",
              },
              name: {
                header: "request.auth.token.name returns rules.String",
                doc: "The display name of the authenticated user.",
              },
              sub: {
                header: "request.auth.token.sub returns rules.String",
                doc: "The unique identifier for the user.",
              },
              "firebase.indentities": {
                header:
                  "request.auth.token.firebase.identities returns rules.Map",
                doc: "A map of provider identities for the user.",
              },
              "firebase.sign_in_provider": {
                header:
                  "request.auth.token.firebase.sign_in_provider returns rules.String",
                doc: "The sign-in provider used by the user.",
              },
              "firebase.tenant": {
                header:
                  "request.auth.token.firebase.tenant returns rules.String",
                doc: "The tenant ID of the user, if applicable.",
              },
            },
          },
        },
      },
      path: {
        header: "request.path returns rules.Path",
        doc: "The path of the requested resource.",
      },
      query: {
        header: "request.query returns rules.Map",
        doc: new MarkdownString(`
          The query parameters of the request. For read requests, this includes parameters such as 'limit', 'offset', and 'orderBy' used in Firestore queries. \n\n
          Example usage: 
          \`\`\`ts
            // Limit documents per request to 50
            allow list: if request.query.limit <= 50
          \`\`\`

        `),
        childs: {
          limit: {
            header: "request.query.limit returns rules.Integer",
            doc: "The limit parameter of the query, if specified.",
          },
          offset: {
            header: "request.query.offset returns rules.Integer",
            doc: "The offset parameter of the query, if specified.",
          },
          orderBy: {
            header: "request.query.orderBy returns rules.List",
            doc: "The orderBy clauses of the query, if specified.",
          },
        },
      },
      time: {
        header: "request.time returns non-null rules.Timestamp",
        doc: new MarkdownString(`
          The time at which the request is being evaluated by the security rules. \n\n
          This can be used to enforce time-based access controls. \n\n
          Example usage: 
          \`\`\`ts
            // Make sure that 'myServerTimestampField' was set using a
            // server-side timestamp.
            request.time == request.resource.data.myServerTimestampField
          \`\`\`
        `),
      },
      method: {
        header: "request.method returns rules.String",
        doc: "The HTTP method of the request (e.g., 'get', 'list', 'create').",
        childs: {
          get: {
            header: "request.method.get returns rules.String",
            doc: "Indicates a 'get' request method.",
          },
          list: {
            header: "request.method.list returns rules.String",
            doc: "Indicates a 'list' request method.",
          },
          create: {
            header: "request.method.create returns rules.String",
            doc: "Indicates a 'create' request method.",
          },
          update: {
            header: "request.method.update returns rules.String",
            doc: "Indicates an 'update' request method.",
          },
          delete: {
            header: "request.method.delete returns rules.String",
            doc: "Indicates a 'delete' request method.",
          },
        },
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
  resource: {
    doc:
      "The resource variable contains information about the existing resource being read or written.",
    childs: {
      __name__: {
        header: "resource.__name__ returns rules.Path",
        doc: "The path of the resource.",
      },
      data: {
        header: "resource.data returns non-null rules.Map",
        doc: new MarkdownString(`
          The current data of the resource as a map. \n\n
          This can be used to read existing field values when validating updates. \n\n
          Example usage: 
          \`\`\`ts
            // Check 'name' field from the document
            resource.data.name == 'John Doe'
          \`\`\`
        `),
      },
      id: {
        header: "resource.id returns rules.String",
        doc: new MarkdownString(`
          String of the document's key (i.e., the document ID). \n\n
          This can be used to enforce rules based on document IDs. \n\n
          Example usage: 
          \`\`\`ts
            resource['__name__'] ==
              /databases/(default)/documents/collection/$(resource.id)
          \`\`\`
        `),
      },
    },
  },
};
