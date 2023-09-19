export function parseParagraphs(text: string) {
  var result = "";
  var lines = text.split("\n");
  var len = lines.length;

  for (var i = 0; i < len; i++) {
    if (lines[i] !== "" && lines[i] !== undefined) {
      var clean = lines[i].trim().replace(/\s{2,}/g, " ");
      if (clean.startsWith("# ")) {
        result +=
          "<h1>" + processBlock(postfixAndTrim(clean, 2)) + "</h1>\n<hr/>\n";
      } else if (clean.startsWith("## ")) {
        // if (isSpringBoard) {
        //   // Make the header clickable and give same behavior as other CTAs
        //   result +=
        //     "<h1><a href='" + link + "' style='color: inherit;'>" +
        //     this.processBlock(this.postfixAndTrim(clean, 3)) +
        //     "</a></h1>\n";
        // } else {
        result += "<h1>" + processBlock(postfixAndTrim(clean, 3)) + "</h1>\n";
      } else if (clean.startsWith("### ")) {
        result +=
          "<h1>" +
          processBlock(postfixAndTrim(clean, 4)) +
          "</h1>\n<hr/>\n";
      } else if (clean.startsWith("#### ")) {
        result +=
          "<h1>" + processBlock(postfixAndTrim(clean, 5)) + "</h1>\n";
      } else if (clean.startsWith("@credit ")) {
        result +=
          '<p class="credit">' +
          processBlock(postfixAndTrim(clean, 8)) +
          "</p>\n";
      } else if (clean.startsWith("@hr")) {
        result += "<hr/>\n";
      } else if (clean.startsWith("@image(")) {
        var found1 = clean.match(/^@image\(([^,]+),([^,]+),([^)]+)\)$/);
        if (found1 !== null) {
          result += '<img src="' + found1[1] + '" class="logo_image" />';
        }
      } else if (clean.startsWith("@link(")) {
        var found2 = clean.match(/^@link\(([^)]+)\)\s+(.+)$/);
        if (found2 !== null) {
          result +=
            '<a href="' +
            found2[1] +
            '" class="source_link">' +
            found2[2] +
            "</a>\n";
        }
      } else if (clean.startsWith("@cta(")) {
        var found2 = clean.match(/^@cta\(([^)]+)\)\s+(.+)$/);
        if (found2 !== null) {
          result +=
            '<div class="cta-container">\n' +
            '<a href="' +
            found2[1] +
            '" class="cta">' +
            found2[2] +
            "</a>\n" +
            "</div>\n";
        }
      } else if (clean.startsWith("@sp")) {
        result += "<p>&nbsp;</p>\n";
      } else {
        result += "<p>" + processBlock(postfixAndTrim(clean, 0)) + "</p>\n";
      }
    }
  }
  return result;
}

function processBlock(text: string) {
  var result = "";
  var anchorText = "";
  var anchorHRef = "";
  var resultOffset = 0;
  var state = "normal";
  var len = text.length;
  for (var i = 0; i < len; i++) {
    var ch = text[i];
    switch (state) {
      case "normal":
        if (ch == "^") {
          state = "sawCaret";
        } else {
          result += ch;
        }
        break;
      case "sawCaret":
        if (ch == "*") {
          result += "<b>";
          state = "inCaret";
        } else if (ch == "&") {
          result += "<i>";
          state = "inCaret";
        } else if (ch == "[") {
          anchorText = "";
          anchorHRef = "";
          resultOffset = result.length; // Start location for text.
          state = "anchorText";
        } else {
          result += ch;
          state = "normal";
        }
        break;
      case "inCaret":
        if (ch == "^") {
          state = "inCaretSawCaret";
        } else {
          result += ch;
        }
        break;
      case "inCaretSawCaret":
        if (ch == "*") {
          result += "</b>";
          state = "normal";
        } else if (ch == "&") {
          result += "</i>";
          state = "normal";
        } else {
          result += ch;
          state = "inCaret";
        }
        break;
      case "anchorText":
        if (ch == "^") {
          state = "anchorTextSawCaret";
        } else {
          result += ch;
        }
        break;
      case "anchorTextSawCaret":
        if (ch == "|") {
          anchorText = result.substring(resultOffset, result.length);
          result = result.substring(0, resultOffset);
          state = "anchorBody";
        } else {
          result += "^" + ch;
          state = "anchorText";
        }
        break;
      case "anchorBody":
        if (ch == "^") {
          state = "anchorBodySawCaret";
        } else {
          result += ch;
        }
        break;
      case "anchorBodySawCaret":
        if (ch == "]") {
          anchorHRef = result.substring(resultOffset, result.length);
          result = result.substring(0, resultOffset);
          // Minor hack - to clean and source outbound href links
          // to set utm_source to mp-fotoscapes
          anchorHRef = anchorHRef.split("?")[0];
          anchorHRef += "?utm_source=mp-fotoscapes";
          result +=
            '<a class="inline-link" href="' +
            anchorHRef +
            '">' +
            anchorText +
            "</a>";
          state = "normal";
        } else {
          result += "^" + ch;
          state = "anchorBody";
        }
        break;
    }
  }
  return result;
}

function postfixAndTrim(text: string, start: number) {
  return text.substring(start).trim();
}
