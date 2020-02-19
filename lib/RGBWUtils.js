function HSVtoRGB(hue, saturation, value) {
  if (hue == null || saturation == null || value == null) {
    return {
        r: null,
        g: null,
        b: null,
        w: null
    }
  }

  let h = hue / 360.0
  let s = saturation / 100.0
  let v = value / 100.0
  let r, g, b, w, i, f, p, q, t

  i = Math.floor(h * 6)
  f = h * 6 - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)

  switch (i % 6) {
      case 0:
          r = v, g = t, b = p
          break
      case 1:
          r = q, g = v, b = p
          break
      case 2:
          r = p, g = v, b = t
          break
      case 3:
          r = p, g = q, b = v
          break
      case 4:
          r = t, g = p, b = v
          break
      case 5:
          r = v, g = p, b = q
          break
  }

  w = Math.min(r, g, b)

  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      w: Math.round(w * 255)
  }
}

function RGBWtoHex(r, g, b, w) {
  //console.log("Converting to Hex");
  if (r == null || g == null || b == null || w == null) {
    return null
  }

  let hexR = r.toString(16).toUpperCase()
  let hexG = g.toString(16).toUpperCase()
  let hexB = b.toString(16).toUpperCase()
  let hexW = w.toString(16).toUpperCase()

  const padding = 2

  while (hexR.length < padding) {
    hexR = "0" + hexR
  }

  while (hexG.length < padding) {
    hexG = "0" + hexG
  }

  while (hexB.length < padding) {
    hexB = "0" + hexB
  }

  while (hexW.length < padding) {
    hexW = "0" + hexW
  }

  hexValue = "#" + hexR + hexG + hexB + hexW

  return hexValue

}

function convertToHSL(rV, gV, bV) {
 // console.log("Converting RGB to HSL....");
  const r = rV / 255
  const g = gV / 255
  const b = bV / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h, s
  let l = (max + min) / 2

  if (max == min) {
    h = 0
    s = 0
  } else {
    let d = max - min

    if (l > 0.5) {
      s = d / (2 - max - min)
    } else {
      s = d / (max + min)
    }

    if (max == r) {
      h = (g - b) / d
      if (g < b) {
        h = h + 6
      }
    } else if (max == g) {
      h = (b - r) / d + 2
    } else if (max == b) {
      h = (r - g) / d + 4
    }
  }

  h = h * 60
  if (h < 0) {
    h = h + 360
  }

  h = Math.round(h)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return {
      h: h,
      s: s,
      l: l
  }
}

module.exports = {
  HSVtoRGB,
  RGBWtoHex,
  convertToHSL
}
