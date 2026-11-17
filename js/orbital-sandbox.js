/* Lightweight Chemistry bonding sandbox: Canvas 3D projection, drag-to-bond, and VSEPR. */
function scienceLabOrbitalMolecule() {
  for (var i = 0; i < SCIENCE_LAB_ORBITAL_MOLECULES.length; i++)
    if (SCIENCE_LAB_ORBITAL_MOLECULES[i].id === scienceLabOrbitalState.moleculeId)
      return SCIENCE_LAB_ORBITAL_MOLECULES[i];
  return SCIENCE_LAB_ORBITAL_MOLECULES[0];
}
function scienceLabOrbitalResetModel(id) {
  var s = scienceLabOrbitalState;
  s.moleculeId = id || s.moleculeId;
  s.hybridization = null; s.hybridised = false; s.formedHydrogens = []; s.sigmaFormed = false; s.piFormed = [];
  s.rotationDegrees = 0; s.attemptedRotation = 0; s.mode = "build"; s.drag = null; s.dragPoint = null; s.hitRegions = [];
  s.complete = false; s.rewarded = false;
  var m = scienceLabOrbitalMolecule();
  s.message = "Start with the " + m.formula + " atom model. Build its " + m.hybridization.replace("3", "³").replace("2", "²") + " orbitals, then drag clouds together to make bonds.";
}
function scienceLabOrbitalRefresh(focusId) {
  if (typeof render === "function") render();
  var target = focusId && document.getElementById(focusId);
  if (target && typeof target.focus === "function") target.focus();
}
function scienceLabOrbitalSelectMolecule(id) {
  if (!SCIENCE_LAB_ORBITAL_MOLECULES.some(function (m) { return m.id === id; })) return;
  scienceLabOrbitalResetModel(id); scienceLabOrbitalRefresh("orbitalMolecule");
}
function scienceLabOrbitalHybridise() {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule();
  s.hybridization = m.hybridization; s.hybridised = true; s.formedHydrogens = []; s.sigmaFormed = false; s.piFormed = [];
  s.rotationDegrees = 0; s.attemptedRotation = 0; s.complete = false; s.rewarded = false;
  s.message = m.hybridization.replace("3", "³").replace("2", "²") + " hybrid orbitals formed. Drag a green orbital lobe onto a hydrogen or the other carbon to create a σ bond.";
  scienceLabOrbitalRefresh();
}
function scienceLabOrbitalSetMode(mode) {
  if (["build", "vsepr", "rotation"].indexOf(mode) < 0) return;
  scienceLabOrbitalState.mode = mode; scienceLabOrbitalState.drag = null; scienceLabOrbitalState.dragPoint = null;
  scienceLabOrbitalRefresh();
}
function scienceLabOrbitalExpectedSigma(m) { return m.hSites.length + (m.ccSigma ? 1 : 0); }
function scienceLabOrbitalSigmaCount(m) { return scienceLabOrbitalState.formedHydrogens.length + (m.ccSigma && scienceLabOrbitalState.sigmaFormed ? 1 : 0); }
function scienceLabOrbitalAllPiFormed(m) {
  for (var i = 0; i < m.piDirections.length; i++) if (!scienceLabOrbitalState.piFormed[i]) return false;
  return true;
}
function scienceLabOrbitalMaybeComplete() {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule();
  if (s.complete || !s.hybridised || s.formedHydrogens.length !== m.hSites.length || (m.ccSigma && !s.sigmaFormed) || !scienceLabOrbitalAllPiFormed(m)) return;
  s.complete = true; s.message = "All the model's σ and π overlaps are in place. Now compare its shape and orbital explanation.";
  scienceLabTrack("bonding", true); scienceLabAward("orbital-" + m.id, s);
}
function scienceLabOrbitalFormHydrogen(index) {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule();
  if (!s.hybridised || index < 0 || index >= m.hSites.length || s.formedHydrogens.indexOf(index) >= 0) return;
  s.formedHydrogens.push(index);
  var symbol = m.ligandSymbol || m.hSymbol || "H", central = m.atoms[m.hSites[index].atom].element;
  s.message = "Head-on overlap makes a " + central + "–" + symbol + " σ bond. Each σ bond contains electron density along its internuclear axis.";
  scienceLabOrbitalMaybeComplete(); scienceLabOrbitalRefresh();
}
function scienceLabOrbitalFormSigma() {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule();
  if (!s.hybridised || !m.ccSigma || s.sigmaFormed) return;
  s.sigmaFormed = true; s.message = "The two carbon hybrid orbitals overlap head-on: one C–C σ bond is formed.";
  scienceLabOrbitalMaybeComplete(); scienceLabOrbitalRefresh();
}
function scienceLabOrbitalFormPi(index) {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule();
  if (!s.hybridised || index < 0 || index >= m.piDirections.length || s.piFormed[index]) return;
  if (!m.ccSigma || !s.sigmaFormed) { s.message = "Build the head-on C–C σ bond first; the π overlap sits alongside it."; scienceLabOrbitalRefresh("orbitalLabStatus"); return; }
  if (Math.abs(s.rotationDegrees) > 1) { s.message = "The p orbitals are twisted out of alignment. Return the atoms to 0° before their side-on overlap can form a π bond."; scienceLabOrbitalRefresh("orbitalLabStatus"); return; }
  s.piFormed[index] = true; s.attemptedRotation = 0;
  var piCount = s.piFormed.filter(Boolean).length;
  s.message = piCount === m.piDirections.length ? "Side-on p–p overlap has formed the π part of the multiple bond. The parallel p clouds now resist rotation." : "One side-on p–p overlap is formed. Align the other perpendicular p-orbital pair to complete the second π bond.";
  scienceLabOrbitalMaybeComplete(); scienceLabOrbitalRefresh();
}
function scienceLabOrbitalClearBonds() {
  var s = scienceLabOrbitalState;
  s.formedHydrogens = []; s.sigmaFormed = false; s.piFormed = []; s.rotationDegrees = 0; s.attemptedRotation = 0; s.complete = false; s.rewarded = false;
  s.message = "Bond overlaps cleared. The " + scienceLabOrbitalMolecule().hybridization.replace("3", "³").replace("2", "²") + " orbital set is ready to build again.";
  scienceLabOrbitalRefresh();
}
function scienceLabOrbitalRotate(value, control) {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule(), n = Number(value);
  if (!isFinite(n)) return;
  n = Math.max(-90, Math.min(90, n));
  var piBuilt = s.piFormed.some(Boolean);
  if (piBuilt && m.rotation === "restricted") {
    s.attemptedRotation = n; s.rotationDegrees = 0;
    s.message = "Rotation blocked: twisting would destroy the sideways overlap between the parallel p orbitals. The σ framework remains; the π overlap must be broken to rotate.";
    if (control) control.value = "0";
  } else {
    s.rotationDegrees = n; s.attemptedRotation = 0;
    s.message = Math.abs(n) < 1 ? "The groups are aligned at 0°. Compare the p-orbital clouds before and after a twist." : "The groups are twisted " + Math.round(n) + "°. A σ bond can keep its head-on overlap as the groups rotate.";
    if (!piBuilt && m.piDirections.length && Math.abs(n) > 1) s.message += " The unformed p clouds no longer line up for π overlap.";
  }
  scienceLabOrbitalSyncRotationControls(); scienceLabOrbitalDraw();
}
function scienceLabOrbitalSyncRotationControls() {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule();
  scienceLabSetText("orbitalRotationValue", Math.round(s.attemptedRotation || s.rotationDegrees) + "°");
  scienceLabSetText("orbitalRotationActual", Math.round(s.rotationDegrees) + "° actual twist");
  scienceLabSetText("orbitalRotationStatus", s.attemptedRotation ? "A " + (s.attemptedRotation > 0 ? "+" : "") + Math.round(s.attemptedRotation) + "° twist was blocked." : (m.piDirections.length && s.piFormed.some(Boolean) ? "π overlap locks the bond axis." : "Drag the control to twist one end."));
  scienceLabSetText("orbitalLabStatus", s.message);
}
function scienceLabOrbitalRotateAboutX(v, degrees) {
  var a = degrees * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a);
  return [v[0], v[1] * c - v[2] * sn, v[1] * sn + v[2] * c];
}
function scienceLabOrbitalSiteDirection(m, site) {
  var direction = [site.direction[0], site.direction[1], site.direction[2]], s = scienceLabOrbitalState;
  if (site.atom === 1 && m.ccSigma && Math.abs(s.rotationDegrees) > 0.1 && !s.piFormed.some(Boolean)) direction = scienceLabOrbitalRotateAboutX(direction, s.rotationDegrees);
  return direction;
}
function scienceLabOrbitalPiDirection(atom, direction) {
  var result = [direction[0], direction[1], direction[2]], s = scienceLabOrbitalState;
  if (atom === 1 && Math.abs(s.rotationDegrees) > 0.1 && !s.piFormed.some(Boolean)) result = scienceLabOrbitalRotateAboutX(result, s.rotationDegrees);
  return result;
}
function scienceLabOrbitalAdd(a, b, amount) { return [a[0] + b[0] * amount, a[1] + b[1] * amount, a[2] + b[2] * amount]; }
function scienceLabOrbitalProjector(g) {
  var s = scienceLabOrbitalState, cy = Math.cos(s.cameraYaw), sy = Math.sin(s.cameraYaw), cp = Math.cos(s.cameraPitch), sp = Math.sin(s.cameraPitch), scale = 128 * s.zoom;
  return function (v) {
    var x = v[0] * cy + v[2] * sy, z = -v[0] * sy + v[2] * cy, y = v[1] * cp - z * sp, depth = v[1] * sp + z * cp, perspective = 2.8 / (2.8 + depth * 0.11);
    return { x: g.w / 2 + x * scale * perspective, y: g.h / 2 - y * scale * perspective, z: depth };
  };
}
function scienceLabOrbitalDistance(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
function scienceLabOrbitalRememberHit(s, type, id, atom, direction, point, radius) { s.hitRegions.push({ type: type, id: id, atom: atom, direction: direction, x: point.x, y: point.y, radius: radius }); }
function scienceLabOrbitalDrawEllipse(ctx, project, center, axis, major, minor, fill, stroke, alpha) {
  var at = project(center), along = project(scienceLabOrbitalAdd(center, axis, 0.2)), angle = Math.atan2(along.y - at.y, along.x - at.x);
  ctx.save(); ctx.translate(at.x, at.y); ctx.rotate(angle); ctx.beginPath(); ctx.ellipse(0, 0, major, minor, 0, 0, Math.PI * 2);
  ctx.globalAlpha = alpha; ctx.fillStyle = fill; ctx.fill(); ctx.globalAlpha = Math.min(1, alpha + 0.38); ctx.strokeStyle = stroke || fill; ctx.lineWidth = 1.5; ctx.stroke(); ctx.restore(); return at;
}
function scienceLabOrbitalDecodeDensity(cloud) {
  if (!cloud || !cloud.packed) return null;
  if (cloud._decoded) return cloud._decoded;
  var binary = typeof atob === "function" ? atob(cloud.packed) : "";
  if (!binary && typeof Buffer !== "undefined") binary = Buffer.from(cloud.packed, "base64").toString("binary");
  var bytes = new Uint8Array(binary.length);
  for (var i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  cloud._decoded = bytes;
  return bytes;
}
function scienceLabOrbitalDensityComponents(m) {
  var s = scienceLabOrbitalState, density = SCIENCE_LAB_ORBITAL_MODEL_DATA.density[m.id], components = [];
  if (!density) return components;
  function add(item, kind) { if (item && item.cloud) components.push({ entry: item, kind: kind }); }
  if (!s.hybridised) {
    density.atomClouds.forEach(function (item) { add(item, "atomic"); });
    density.ligandAtomClouds.forEach(function (item) { add(item, "atomic"); });
    return components;
  }
  m.hSites.forEach(function (_, index) {
    if (s.formedHydrogens.indexOf(index) >= 0) add(density.sigmaBonds.terminal[index], "sigma");
    else {
      add(density.hybridSites[index], "orbital");
      add(density.ligandSites[index], "atomic");
    }
  });
  if (m.ccSigma) {
    if (s.sigmaFormed) add({ anchorAtom: null, cloud: density.sigmaBonds.cc }, "sigma");
    else density.sigmaSites.forEach(function (item) { add(item, "orbital"); });
  }
  density.lonePairs.forEach(function (item) { add(item, "lonePair"); });
  density.piAtomic.forEach(function (pair, index) {
    if (s.piFormed[index]) add(density.piBonds[index], "pi");
    else pair.forEach(function (item) { add(item, "p"); });
  });
  density.ligandLonePairs.forEach(function (item) { add(item, "lonePair"); });
  return components;
}
function scienceLabOrbitalDrawDensity(ctx, project, molecule) {
  var s = scienceLabOrbitalState, model = SCIENCE_LAB_ORBITAL_MODEL_DATA, components = scienceLabOrbitalDensityComponents(molecule), points = [];
  if (!s.electronDensity || !components.length) return;
  var colours = { atomic: "#a98750", orbital: "#68996f", sigma: "#34835b", pi: "#477f9b", lonePair: "#c1843d", p: "#628ca4" };
  components.forEach(function (component) {
    var entry = component.entry, cloud = entry.cloud, data = scienceLabOrbitalDecodeDensity(cloud);
    if (!data) return;
    for (var i = 0; i + 3 < data.length; i += 4) {
      var point = [((data[i] / 255) * 2 - 1) * model.bounds[1], ((data[i + 1] / 255) * 2 - 1) * model.bounds[1], ((data[i + 2] / 255) * 2 - 1) * model.bounds[1]];
      if (entry.anchorAtom === 1 && molecule.ccSigma && Math.abs(s.rotationDegrees) > 0.1 && !s.piFormed.some(Boolean)) {
        var pivot = molecule.atoms[1].position;
        point = scienceLabOrbitalAdd(pivot, scienceLabOrbitalRotateAboutX([point[0] - pivot[0], point[1] - pivot[1], point[2] - pivot[2]], s.rotationDegrees), 1);
      }
      var projected = project(point);
      points.push({ x: projected.x, y: projected.y, z: projected.z, intensity: data[i + 3] / 255, electrons: cloud.electrons || 1, colour: colours[component.kind] || colours.atomic });
    }
  });
  points.sort(function (a, b) { return b.z - a.z; });
  ctx.save();
  points.forEach(function (point) {
    var intensity = Math.sqrt(point.intensity), occupancy = 0.84 + 0.12 * Math.log2(point.electrons + 1);
    ctx.globalAlpha = Math.min(0.34, (0.035 + 0.19 * intensity) * occupancy);
    ctx.fillStyle = point.colour; ctx.beginPath(); ctx.arc(point.x, point.y, 1.5 + 2.7 * intensity, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();
}
function scienceLabOrbitalDrawArrow(ctx, from, to, colour) {
  var dx = to.x - from.x, dy = to.y - from.y, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len, head = 6;
  ctx.strokeStyle = colour; ctx.fillStyle = colour; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(to.x, to.y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(to.x, to.y); ctx.lineTo(to.x - ux * head - uy * head * 0.55, to.y - uy * head + ux * head * 0.55); ctx.lineTo(to.x - ux * head + uy * head * 0.55, to.y - uy * head - ux * head * 0.55); ctx.closePath(); ctx.fill();
}
function scienceLabOrbitalDrawAtom(ctx, point, symbol, label, central, formed) {
  var radius = central ? 22 : 15;
  ctx.save(); ctx.fillStyle = central ? (symbol === "O" ? "#c86b50" : symbol === "N" ? "#4e8290" : symbol === "B" ? "#c08b42" : "#3e805a") : (formed ? "#fffaf0" : "#f8f1e2");
  ctx.strokeStyle = central ? (symbol === "O" ? "#9f4838" : symbol === "N" ? "#315e69" : symbol === "B" ? "#88602e" : "#28543b") : (formed ? "#6a986d" : "#c38747");
  ctx.lineWidth = central ? 3 : 2; ctx.beginPath(); ctx.arc(point.x, point.y, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  ctx.fillStyle = central ? "rgba(255,255,255,.72)" : "#fffdf7"; ctx.beginPath(); ctx.arc(point.x - radius * 0.28, point.y - radius * 0.32, radius * 0.18, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = central ? "#fffdf7" : "#4e5448"; ctx.font = "700 " + (central ? "14" : "11") + "px 'DM Sans',sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(symbol, point.x, point.y + 1);
  if (label) { ctx.fillStyle = "#596655"; ctx.font = "700 9px 'DM Mono',monospace"; ctx.fillText(label, point.x, point.y + radius + 12); }
  ctx.restore();
}
function scienceLabOrbitalDrawText(ctx, text, x, y, colour, size, align) {
  ctx.fillStyle = colour; ctx.font = "700 " + size + "px 'DM Mono',monospace"; ctx.textAlign = align || "left"; ctx.textBaseline = "middle"; ctx.fillText(text, x, y);
}
function scienceLabOrbitalDrawUnhybridised(ctx, project, atom) {
  var center = atom.position, p = project(center), axes = [
    { v: [1, 0, 0], c: "#4c8d75", label: "2pₓ" }, { v: [0, 1, 0], c: "#b4784e", label: "2pᵧ" }, { v: [0, 0, 1], c: "#737eb0", label: "2p_z" },
  ];
  ctx.save(); ctx.globalAlpha = 0.24; ctx.fillStyle = "#edc965"; ctx.strokeStyle = "#b8913c"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(p.x, p.y, 31, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 0.72; ctx.stroke(); ctx.restore();
  scienceLabOrbitalDrawText(ctx, "2s", p.x + 25, p.y - 26, "#9a7428", 9, "left");
  axes.forEach(function (axis) { [1, -1].forEach(function (sign) {
    var direction = [axis.v[0] * sign, axis.v[1] * sign, axis.v[2] * sign], lobeCenter = scienceLabOrbitalAdd(center, direction, 0.58), at = scienceLabOrbitalDrawEllipse(ctx, project, lobeCenter, direction, 19, 11, axis.c, axis.c, 0.24);
    if (sign === 1) scienceLabOrbitalDrawText(ctx, axis.label, at.x + 10, at.y - 14, axis.c, 8, "left");
  }); });
}
function scienceLabOrbitalDraw() {
  var g = scienceLabCanvas("labOrbitalCanvas", 860, 560); if (!g) return;
  var c = g.ctx, s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule(), project = scienceLabOrbitalProjector(g),
    atomPoints = m.atoms.map(function (atom) { return project(atom.position); }),
    terminalSites = m.hSites.map(function (site) {
      var direction = scienceLabOrbitalSiteDirection(m, site), center = m.atoms[site.atom].position, position = scienceLabOrbitalAdd(center, direction, 1.0);
      return { site: site, direction: direction, position: position, point: project(position) };
    });
  c.clearRect(0, 0, g.w, g.h); c.fillStyle = "#f7f2e8"; c.fillRect(0, 0, g.w, g.h); c.fillStyle = "#fbf9f2"; c.fillRect(12, 12, g.w - 24, g.h - 24);
  c.strokeStyle = "#ded6c5"; c.lineWidth = 1; c.strokeRect(12.5, 12.5, g.w - 25, g.h - 25);
  scienceLabOrbitalDrawText(c, "3D ORBITAL MODEL · " + m.formula, 32, 35, "#385c43", 12, "left");
  var canvasGuide = s.electronDensity ? "PYTHON LCAO DENSITY · DENSER CLOUDS = HIGHER PROBABILITY" : s.mode === "vsepr" ? "DRAG EMPTY SPACE TO ORBIT · WATCH DOMAINS REPEL" : s.mode === "rotation" ? "DRAG EMPTY SPACE TO ORBIT · USE THE TWIST CONTROL" : s.hybridised ? "DRAG A GREEN LOBE TO ITS OUTLINED ATOM · EMPTY SPACE TO ORBIT" : "DRAG EMPTY SPACE TO ORBIT · HYBRIDISE TO BEGIN";
  scienceLabOrbitalDrawText(c, canvasGuide, g.w - 32, 35, "#777666", 9, "right");
  c.strokeStyle = "#ebe4d5"; c.lineWidth = 1; c.beginPath(); c.moveTo(30, g.h - 46); c.lineTo(g.w - 30, g.h - 46); c.stroke();
  scienceLabOrbitalDrawText(c, "σ HEAD-ON", 34, g.h - 28, "#47875d", 9, "left"); scienceLabOrbitalDrawText(c, "π SIDE-ON", 143, g.h - 28, "#507e9b", 9, "left"); scienceLabOrbitalDrawText(c, "LONE PAIR", 253, g.h - 28, "#bd8241", 9, "left"); scienceLabOrbitalDrawText(c, "CONCEPTUAL · NOT TO SCALE", g.w - 34, g.h - 28, "#898271", 8, "right");
  s.hitRegions = [];
  if (s.hybridised) {
    terminalSites.forEach(function (item, index) { if (!s.formedHydrogens.includes(index)) return; var start = atomPoints[item.site.atom], end = item.point; c.strokeStyle = "#367a55"; c.lineWidth = 4; c.beginPath(); c.moveTo(start.x, start.y); c.lineTo(end.x, end.y); c.stroke(); });
    if (m.ccSigma && s.sigmaFormed) { c.strokeStyle = "#367a55"; c.lineWidth = 5; c.beginPath(); c.moveTo(atomPoints[0].x, atomPoints[0].y); c.lineTo(atomPoints[1].x, atomPoints[1].y); c.stroke(); var mid = { x: (atomPoints[0].x + atomPoints[1].x) / 2, y: (atomPoints[0].y + atomPoints[1].y) / 2 }; scienceLabOrbitalDrawText(c, "σ", mid.x, mid.y - 13, "#276143", 12, "center"); }
  }
  if (s.mode === "vsepr") {
    function showDomain(atomIndex, direction, lonePair) {
      var center = m.atoms[atomIndex].position, cloudCenter = scienceLabOrbitalAdd(center, direction, 0.5), cloud = scienceLabOrbitalDrawEllipse(c, project, cloudCenter, direction, 27, 19, lonePair ? "#e2ae55" : "#69a989", lonePair ? "#b77c34" : "#488568", 0.34), origin = project(scienceLabOrbitalAdd(center, direction, 0.18)), arrowEnd = project(scienceLabOrbitalAdd(center, direction, 0.35));
      scienceLabOrbitalDrawArrow(c, origin, arrowEnd, lonePair ? "#b77c34" : "#4c8462");
      if (lonePair) { c.fillStyle = "#815522"; c.beginPath(); c.arc(cloud.x - 4, cloud.y, 2, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(cloud.x + 4, cloud.y, 2, 0, Math.PI * 2); c.fill(); }
      scienceLabOrbitalDrawText(c, lonePair ? "LP" : "e⁻", cloud.x, cloud.y - 22, lonePair ? "#9c682a" : "#39714f", 8, "center");
    }
    m.hSites.forEach(function (site) { showDomain(site.atom, scienceLabOrbitalSiteDirection(m, site), false); });
    m.sigmaDirections.forEach(function (site) { showDomain(site.atom, site.direction, false); });
    m.lonePairs.forEach(function (site) { showDomain(site.atom, site.direction, true); });
  } else if (!s.hybridised) {
    m.atoms.forEach(function (atom) { scienceLabOrbitalDrawUnhybridised(c, project, atom); });
  } else {
    m.hSites.forEach(function (site, index) {
      var direction = scienceLabOrbitalSiteDirection(m, site), center = scienceLabOrbitalAdd(m.atoms[site.atom].position, direction, 0.48), at = scienceLabOrbitalDrawEllipse(c, project, center, direction, 28, 15, "#65aa7e", "#34734f", 0.32), formed = s.formedHydrogens.includes(index);
      if (!formed) scienceLabOrbitalRememberHit(s, "sigma-site", index, site.atom, null, at, 30);
      if (!formed && index === 0) scienceLabOrbitalDrawText(c, "sp", at.x, at.y - 22, "#34734f", 8, "center");
    });
    m.sigmaDirections.forEach(function (site) {
      var direction = site.atom === 1 && Math.abs(s.rotationDegrees) > 0.1 && !s.piFormed.some(Boolean) ? scienceLabOrbitalRotateAboutX(site.direction, s.rotationDegrees) : site.direction,
        center = scienceLabOrbitalAdd(m.atoms[site.atom].position, direction, 0.48), at = scienceLabOrbitalDrawEllipse(c, project, center, direction, 30, 16, "#63a87b", "#34734f", 0.38);
      if (!s.sigmaFormed) scienceLabOrbitalRememberHit(s, "cc-site", site.atom, site.atom, null, at, 31);
    });
    m.lonePairs.forEach(function (site) {
      var center = scienceLabOrbitalAdd(m.atoms[site.atom].position, site.direction, 0.48), at = scienceLabOrbitalDrawEllipse(c, project, center, site.direction, 27, 15, "#e2af58", "#b67a32", 0.4);
      c.fillStyle = "#815522"; c.beginPath(); c.arc(at.x - 4, at.y, 2, 0, Math.PI * 2); c.fill(); c.beginPath(); c.arc(at.x + 4, at.y, 2, 0, Math.PI * 2); c.fill();
    });
    m.piDirections.forEach(function (rawDirection, directionIndex) {
      m.atoms.forEach(function (atom, atomIndex) {
        var direction = scienceLabOrbitalPiDirection(atomIndex, rawDirection);
        [-1, 1].forEach(function (sign) {
          var lobeDirection = [direction[0] * sign, direction[1] * sign, direction[2] * sign], center = scienceLabOrbitalAdd(atom.position, lobeDirection, 0.39), at = scienceLabOrbitalDrawEllipse(c, project, center, lobeDirection, 28, 17, "#6da9c2", "#457e9b", s.piFormed[directionIndex] ? 0.52 : 0.3);
          if (!s.piFormed[directionIndex]) scienceLabOrbitalRememberHit(s, "pi-cloud", directionIndex, atomIndex, directionIndex, at, 31);
        });
      });
      if (s.piFormed[directionIndex]) { var midpoint = { x: (atomPoints[0].x + atomPoints[1].x) / 2, y: (atomPoints[0].y + atomPoints[1].y) / 2 }; scienceLabOrbitalDrawText(c, "π", midpoint.x, midpoint.y - 31 - directionIndex * 12, "#386f8a", 12, "center"); }
    });
  }
  scienceLabOrbitalDrawDensity(c, project, m);
  terminalSites.forEach(function (item, index) {
    var formed = s.formedHydrogens.includes(index), point = item.point, symbol = m.ligandSymbol || m.hSymbol || "H";
    c.save(); c.globalAlpha = formed ? 0.16 : 0.22; c.fillStyle = "#f0ca78"; c.beginPath(); c.arc(point.x, point.y, 23, 0, Math.PI * 2); c.fill(); c.restore();
    scienceLabOrbitalDrawAtom(c, point, symbol, symbol + (index + 1), false, formed);
    if (s.hybridised && !formed) scienceLabOrbitalRememberHit(s, "h-target", index, item.site.atom, null, point, 24);
  });
  atomPoints.forEach(function (point, index) { var atom = m.atoms[index]; scienceLabOrbitalDrawAtom(c, point, atom.element, atom.element + (index + 1), true, false); scienceLabOrbitalRememberHit(s, "central-atom", index, index, null, point, 27); });
  if (s.drag && s.dragPoint && s.drag.type !== "camera") {
    var origin = { x: s.drag.x, y: s.drag.y }, target = s.dragPoint; c.strokeStyle = s.drag.type === "pi-cloud" ? "#3c7894" : "#3e875a"; c.lineWidth = 3; c.beginPath(); c.moveTo(origin.x, origin.y); c.lineTo(target.x, target.y); c.stroke(); c.fillStyle = "#fffdf7"; c.strokeStyle = "#b77b3f"; c.lineWidth = 2; c.beginPath(); c.arc(target.x, target.y, 9, 0, Math.PI * 2); c.fill(); c.stroke();
  }
  if (s.attemptedRotation && m.rotation === "restricted") {
    c.fillStyle = "#a4523d"; c.beginPath(); if (c.roundRect) c.roundRect(g.w - 196, 55, 164, 27, 5); else c.rect(g.w - 196, 55, 164, 27); c.fill();
    scienceLabOrbitalDrawText(c, "π OVERLAP · ROTATION LOCKED", g.w - 114, 68.5, "#fffaf0", 8, "center");
  }
}
function scienceLabOrbitalPointerPoint(event) {
  var canvas = event.currentTarget || document.getElementById("labOrbitalCanvas"), rect = canvas && canvas.getBoundingClientRect ? canvas.getBoundingClientRect() : null;
  if (!rect || !rect.width || !rect.height) return { x: 0, y: 0 };
  return { x: (event.clientX - rect.left) * 860 / rect.width, y: (event.clientY - rect.top) * 560 / rect.height };
}
function scienceLabOrbitalPointerDown(event) {
  var s = scienceLabOrbitalState, point = scienceLabOrbitalPointerPoint(event), hit = null, bestPriority = -1, bestDistance = Infinity;
  var priorities = { "sigma-site": 5, "cc-site": 5, "pi-cloud": 5, "h-target": 4, "central-atom": 1 };
  for (var i = 0; i < s.hitRegions.length; i++) {
    var candidate = s.hitRegions[i], distance = scienceLabOrbitalDistance(point, candidate), priority = priorities[candidate.type] || 0;
    if (distance <= candidate.radius && (priority > bestPriority || (priority === bestPriority && distance < bestDistance))) {
      hit = candidate; bestPriority = priority; bestDistance = distance;
    }
  }
  if (s.mode !== "build") hit = null;
  if (hit) s.drag = { type: hit.type, id: hit.id, atom: hit.atom, direction: hit.direction, x: hit.x, y: hit.y, startX: point.x, startY: point.y, yaw: s.cameraYaw, pitch: s.cameraPitch };
  else s.drag = { type: "camera", startX: point.x, startY: point.y, yaw: s.cameraYaw, pitch: s.cameraPitch };
  s.dragPoint = point; if (event.preventDefault) event.preventDefault();
  var canvas = event.currentTarget;
  if (canvas && canvas.setPointerCapture && event.pointerId != null) { try { canvas.setPointerCapture(event.pointerId); } catch (e) {} }
  scienceLabOrbitalDraw();
}
function scienceLabOrbitalPointerMove(event) {
  var s = scienceLabOrbitalState; if (!s.drag) return;
  var point = scienceLabOrbitalPointerPoint(event); s.dragPoint = point;
  if (s.drag.type === "camera") { s.cameraYaw = s.drag.yaw + (point.x - s.drag.startX) * 0.009; s.cameraPitch = Math.max(-1.12, Math.min(1.12, s.drag.pitch + (point.y - s.drag.startY) * 0.008)); }
  if (event.preventDefault) event.preventDefault(); scienceLabOrbitalDraw();
}
function scienceLabOrbitalFindRegion(types, predicate, point) {
  var regions = scienceLabOrbitalState.hitRegions, best = null, bestDistance = Infinity;
  for (var i = 0; i < regions.length; i++) { var item = regions[i]; if (types.indexOf(item.type) < 0 || (predicate && !predicate(item))) continue; var distance = scienceLabOrbitalDistance(item, point); if (distance <= item.radius + 12 && distance < bestDistance) { best = item; bestDistance = distance; } }
  return best;
}
function scienceLabOrbitalPointerUp(event) {
  var s = scienceLabOrbitalState, drag = s.drag; if (!drag) return;
  var point = scienceLabOrbitalPointerPoint(event), m = scienceLabOrbitalMolecule(); s.drag = null; s.dragPoint = null;
  if (drag.type === "sigma-site") { var target = scienceLabOrbitalFindRegion(["h-target"], function (r) { return r.id === drag.id; }, point); if (target) { scienceLabOrbitalFormHydrogen(drag.id); return; } }
  else if (drag.type === "h-target") { var source = scienceLabOrbitalFindRegion(["sigma-site"], function (r) { return r.id === drag.id; }, point); if (source) { scienceLabOrbitalFormHydrogen(drag.id); return; } }
  else if (drag.type === "cc-site") { var ccTarget = scienceLabOrbitalFindRegion(["central-atom"], function (r) { return r.atom !== drag.atom; }, point); if (ccTarget) { scienceLabOrbitalFormSigma(); return; } }
  else if (drag.type === "central-atom" && m.ccSigma) { var ccSource = scienceLabOrbitalFindRegion(["cc-site"], function (r) { return r.atom !== drag.atom; }, point); if (ccSource) { scienceLabOrbitalFormSigma(); return; } }
  else if (drag.type === "pi-cloud") { var piTarget = scienceLabOrbitalFindRegion(["pi-cloud"], function (r) { return r.atom !== drag.atom && r.direction === drag.direction; }, point); if (piTarget) { scienceLabOrbitalFormPi(drag.direction); return; } }
  scienceLabOrbitalDraw();
}
function scienceLabOrbitalKey(event) {
  var s = scienceLabOrbitalState; if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "+", "-"].indexOf(event.key) < 0) return;
  if (event.preventDefault) event.preventDefault();
  if (event.key === "ArrowLeft") s.cameraYaw -= 0.12; else if (event.key === "ArrowRight") s.cameraYaw += 0.12; else if (event.key === "ArrowUp") s.cameraPitch = Math.max(-1.12, s.cameraPitch - 0.1); else if (event.key === "ArrowDown") s.cameraPitch = Math.min(1.12, s.cameraPitch + 0.1); else if (event.key === "+") s.zoom = Math.min(1.45, s.zoom + 0.08); else if (event.key === "-") s.zoom = Math.max(0.7, s.zoom - 0.08);
  scienceLabOrbitalDraw();
}
function scienceLabOrbitalZoom(value) { var n = Number(value); if (!isFinite(n)) return; scienceLabOrbitalState.zoom = Math.max(0.7, Math.min(1.45, n)); scienceLabOrbitalDraw(); }
function scienceLabOrbitalToggleDensity() {
  var s = scienceLabOrbitalState;
  s.electronDensity = !s.electronDensity;
  var button = document.getElementById("orbitalDensityToggle"), status = document.getElementById("orbitalDensityStatus");
  if (button) { button.textContent = s.electronDensity ? "Hide Python-simulated electron density" : "Show Python-simulated electron density"; button.setAttribute("aria-pressed", String(s.electronDensity)); }
  if (status) status.textContent = s.electronDensity ? "Dot density indicates approximate electron probability, not particle paths." : "Optional density view · offline Gaussian-AO / LCAO model.";
  scienceLabOrbitalDraw();
}
function scienceLabOrbitalResetView() { var s = scienceLabOrbitalState; s.cameraYaw = -0.38; s.cameraPitch = 0.24; s.zoom = 1; var zoom = document.getElementById("orbitalZoomSlider"); if (zoom) zoom.value = "1"; scienceLabOrbitalDraw(); }
function scienceLabOrbitalModeMarkup(mode, label) {
  var active = scienceLabOrbitalState.mode === mode;
  return "<button type='button' class='orbital-mode-tab" + (active ? " active" : "") + "' onclick=\"scienceLabOrbitalSetMode('" + mode + "')\" aria-pressed='" + active + "'" + (mode === "rotation" && !scienceLabOrbitalMolecule().ccSigma ? " disabled" : "") + ">" + label + "</button>";
}
function scienceLabOrbitalBondButton(text, call, disabled, className) {
  return "<button type='button' class='orbital-bond-action" + (className ? " " + className : "") + "' onclick='" + call + "'" + (disabled ? " disabled" : "") + ">" + text + "</button>";
}
function scienceLabOrbitalBondControls(m) {
  var s = scienceLabOrbitalState, html = "";
  if (m.ccSigma) html += scienceLabOrbitalBondButton("Make C–C σ bond", "scienceLabOrbitalFormSigma()", !s.hybridised || s.sigmaFormed, "orbital-cc-action");
  m.hSites.forEach(function (site, index) {
    var central = m.atoms[site.atom].element, end = m.ligandSymbol || m.hSymbol || "H", done = s.formedHydrogens.includes(index);
    html += scienceLabOrbitalBondButton("Make " + central + "–" + end + " σ bond " + (index + 1) + (done ? " ✓" : ""), "scienceLabOrbitalFormHydrogen(" + index + ")", !s.hybridised || done, "");
  });
  if (m.piDirections.length) m.piDirections.forEach(function (direction, index) { var done = !!s.piFormed[index]; html += scienceLabOrbitalBondButton("Make π overlap " + (index + 1) + (done ? " ✓" : ""), "scienceLabOrbitalFormPi(" + index + ")", !s.hybridised || !m.ccSigma || !s.sigmaFormed || done, "orbital-pi-action"); });
  return html;
}
function scienceLabOrbitalVseprGraphic(m) {
  var domains = [];
  m.hSites.forEach(function (site) { if (site.atom === 0) domains.push({ direction: site.direction, pair: false, symbol: m.ligandSymbol || m.hSymbol || "H" }); });
  m.sigmaDirections.forEach(function (site) { if (site.atom === 0) domains.push({ direction: site.direction, pair: false, symbol: m.atoms.length > 1 ? m.atoms[1].element : "X" }); });
  m.lonePairs.forEach(function (site) { if (site.atom === 0) domains.push({ direction: site.direction, pair: true, symbol: "LP" }); });
  var paths = "", atoms = "";
  domains.forEach(function (domain) {
    var x = Math.max(27, Math.min(173, 100 + domain.direction[0] * 42 + domain.direction[2] * 15)), y = Math.max(22, Math.min(96, 56 - domain.direction[1] * 37 - domain.direction[2] * 10));
    paths += "<path d='M100 56L" + x.toFixed(1) + " " + y.toFixed(1) + "' stroke='" + (domain.pair ? "#b77b36" : "#4b805d") + "' stroke-width='2.5'/>";
    if (domain.pair) atoms += "<ellipse cx='" + x.toFixed(1) + "' cy='" + y.toFixed(1) + "' rx='11' ry='7' fill='#f0dfaf' stroke='#b77b36' stroke-width='2'/><circle cx='" + (x - 3.5).toFixed(1) + "' cy='" + y.toFixed(1) + "' r='1.4' fill='#80562d'/><circle cx='" + (x + 3.5).toFixed(1) + "' cy='" + y.toFixed(1) + "' r='1.4' fill='#80562d'/>";
    else atoms += "<circle cx='" + x.toFixed(1) + "' cy='" + y.toFixed(1) + "' r='8' fill='#fff8e9' stroke='#bc8042' stroke-width='2'/><text x='" + x.toFixed(1) + "' y='" + (y + 3).toFixed(1) + "' text-anchor='middle' fill='#5b4d38' font-size='7' font-family='sans-serif'>" + scienceLabEscape(domain.symbol) + "</text>";
  });
  var centralColour = m.atoms[0].element === "O" ? "#c86b50" : m.atoms[0].element === "N" ? "#4e8290" : m.atoms[0].element === "B" ? "#c08b42" : "#42815b";
  return "<div class='orbital-vsepr-graphic' role='img' aria-label='" + scienceLabEscape(m.formula + ": " + m.vsepr.domains + "; " + m.vsepr.shape + ", " + m.vsepr.angle) + "'><svg viewBox='0 0 200 112' aria-hidden='true'>" + paths + atoms + "<circle cx='100' cy='56' r='16' fill='" + centralColour + "' stroke='#315a40' stroke-width='2'/><text x='100' y='60' text-anchor='middle' fill='white' font-size='11' font-family='sans-serif'>" + scienceLabEscape(m.atoms[0].element) + "</text></svg><span>" + scienceLabEscape(m.vsepr.shape) + " · " + scienceLabEscape(m.vsepr.angle) + "</span></div>";
}
function scienceLabOrbitalHeaderMarkup() {
  return "<header class='games-heading lab-page-heading orbital-page-heading'><div><button class='games-back-link' onclick=\"go('games')\">← Science Arcade</button><div class='book-eyebrow'>CHEMISTRY · UNIT 1 · BONDING &amp; STRUCTURE</div><h1>⚗️ 3D Bonding Sandbox</h1><p>Hybridise orbitals, drag them into overlap, and turn or twist a molecule to explore its bonds and shape.</p><div class='orbital-page-links'><button class='btn btn-g btn-s' onclick=\"go('topic/chemistry/U1/U1T3')\">← Bonding &amp; Structure notes</button><button class='btn btn-g btn-s' onclick=\"go('games/lab/chemistry')\">Open Collision Lab</button></div></div><div class='lab-top-goal'><span>HYBRIDISE · OVERLAP · EXPLORE</span><b>σ · π · VSEPR</b></div></header>";
}
function scienceLabOrbitalMarkup() {
  var s = scienceLabOrbitalState, m = scienceLabOrbitalMolecule(), stats = scienceLabReadStats().bonding;
  if (!s.message) scienceLabOrbitalResetModel(m.id);
  var formula = m.formula, sigmaDone = scienceLabOrbitalSigmaCount(m), sigmaTotal = scienceLabOrbitalExpectedSigma(m), piDone = s.piFormed.filter(Boolean).length, piTotal = m.piDirections.length,
    options = SCIENCE_LAB_ORBITAL_MOLECULES.map(function (item) { return "<option value='" + item.id + "'" + (item.id === m.id ? " selected" : "") + ">" + scienceLabEscape(item.formula + " · " + item.name) + "</option>"; }).join(""),
    status = scienceLabEscape(s.message), buildPanel = "";
  if (s.mode === "build") {
    var hybridLabel = m.hybridization.replace("3", "³").replace("2", "²"), hybridInfo = m.hybridization === "sp3" ? "one s orbital + three p orbitals" : m.hybridization === "sp2" ? "one s orbital + two p orbitals" : "one s orbital + one p orbital";
    buildPanel = `<div class='orbital-hybrid-card'><div><span class='orbital-step-number'>1</span><b>Build ${hybridLabel} hybrid orbitals</b></div><p>${hybridInfo} combine on each central atom. The remaining p orbitals can make π bonds.</p><button type='button' class='btn btn-p orbital-primary-action' onclick='scienceLabOrbitalHybridise()'>${s.hybridised ? "↻ Reset &amp; rebuild orbitals" : "Make " + hybridLabel + " orbitals"}</button></div><div class='orbital-bond-heading'><span>2 · FORM THE BONDS</span><small>Drag a green orbital onto its outlined atom. Keyboard and touch alternatives are below.</small></div><div class='orbital-bond-actions' role='group' aria-label='Accessible bond formation controls'>${scienceLabOrbitalBondControls(m)}</div><button type='button' class='btn btn-g orbital-secondary-action' onclick='scienceLabOrbitalClearBonds()'${!s.hybridised || (!s.formedHydrogens.length && !s.sigmaFormed && !s.piFormed.some(Boolean)) ? " disabled" : ""}>Clear formed overlaps</button>`;
  } else if (s.mode === "vsepr") {
    buildPanel = `<div class='orbital-vsepr-card'><span class='orbital-step-number'>VSEPR VIEW</span><h3>Electron domains repel</h3><p>Follow the outward arrows: each bonding domain and lone pair pushes away from the central atom. Lone pairs repel more strongly than bonding pairs.</p>${scienceLabOrbitalVseprGraphic(m)}<dl><div><dt>Electron domains</dt><dd>${scienceLabEscape(m.vsepr.domains)}</dd></div><div><dt>Electron geometry</dt><dd>${scienceLabEscape(m.vsepr.electronGeometry)}</dd></div><div><dt>Molecular shape</dt><dd>${scienceLabEscape(m.vsepr.shape)}</dd></div><div><dt>Typical bond angle</dt><dd class='orbital-angle-value'>${scienceLabEscape(m.vsepr.angle)}</dd></div></dl><p class='orbital-vsepr-explain'>${scienceLabEscape(m.vsepr.explanation)}</p></div>`;
  } else {
    var piLocks = s.piFormed.some(Boolean), rotationValue = Math.round(s.rotationDegrees), rotationLead = m.piDirections.length ? (piLocks ? "The π cloud locks the axis." : "Before the π bond forms, a σ bond can rotate; twisting misaligns the p orbitals.") : "A single σ bond is cylindrically symmetrical around its axis.";
    buildPanel = `<div class='orbital-rotation-card'><span class='orbital-step-number'>TWIST THE BOND</span><h3>Rotate one end of ${scienceLabEscape(formula)}</h3><p>${rotationLead}</p><label for='orbitalRotationSlider' class='orbital-rotation-label'>Attempted twist <output id='orbitalRotationValue'>${s.attemptedRotation || rotationValue}°</output></label><input id='orbitalRotationSlider' class='orbital-rotation-slider' type='range' min='-90' max='90' step='5' value='${rotationValue}' oninput='scienceLabOrbitalRotate(this.value,this)' aria-label='Twist the right-hand end around the carbon-carbon bond'><div class='orbital-rotation-scale'><span>−90°</span><span>0° · aligned</span><span>+90°</span></div><div class='orbital-rotation-readout' id='orbitalRotationStatus' role='status' aria-live='polite'>${s.attemptedRotation ? "A " + Math.round(s.attemptedRotation) + "° twist was blocked." : (piLocks ? "π overlap locks the bond axis." : "Drag the control to twist one end.")}</div><div class='orbital-angle-readout'><span>MODEL ROTATION</span><b id='orbitalRotationActual'>${rotationValue}° actual twist</b></div><p class='orbital-rotation-key'>Green: head-on σ overlap stays. Blue: side-on π overlap is lost if the p clouds are twisted.</p></div>`;
  }
  var modeTabs = `<div class='orbital-mode-tabs' role='group' aria-label='Choose a chemistry model view'>${scienceLabOrbitalModeMarkup("build", "① Build bonds")}${scienceLabOrbitalModeMarkup("vsepr", "② See VSEPR")}${scienceLabOrbitalModeMarkup("rotation", "③ Twist bond")}</div>`,
    readout = `<div class='orbital-progress-grid'><div><span>σ BONDS</span><b>${sigmaDone} / ${sigmaTotal}</b><small>head-on overlap</small></div><div><span>π BONDS</span><b>${piDone} / ${piTotal}</b><small>side-on overlap</small></div></div>`,
    badge = s.hybridised ? (s.complete ? "BONDS COMPLETE" : piDone + " / " + piTotal + " π FORMED") : "ORBITALS NOT HYBRIDISED";
  return `<section class='games-hub science-lab-page orbital-lab-page'>${scienceLabOrbitalHeaderMarkup()}<div class='orbital-layout'><section class='lab-stage-card orbital-stage-card'><div class='lab-stage-heading'><div><span>LIGHTWEIGHT PROJECTED 3D MOLECULAR MODEL</span><b>${scienceLabEscape(m.name)} · ${scienceLabEscape(formula)}</b></div><span class='lab-live-badge' id='orbitalModelBadge'>${badge}</span></div><div class='orbital-canvas-shell'><canvas id='labOrbitalCanvas' width='860' height='560' role='img' tabindex='0' aria-label='Interactive 3D-projected orbital model of ${scienceLabEscape(formula)}. Drag an orbital onto an atom to make a bond; drag empty space to rotate the view. Use the arrow keys to orbit.' onpointerdown='scienceLabOrbitalPointerDown(event)' onpointermove='scienceLabOrbitalPointerMove(event)' onpointerup='scienceLabOrbitalPointerUp(event)' onpointercancel='scienceLabOrbitalPointerUp(event)' onkeydown='scienceLabOrbitalKey(event)'>3D-projected model of ${scienceLabEscape(formula)}. It shows hybrid orbitals, atom positions, sigma and pi overlap, and electron-domain repulsion.</canvas><div class='orbital-zoom-control'><label for='orbitalZoomSlider'>Model size</label><input id='orbitalZoomSlider' type='range' min='0.7' max='1.45' step='0.05' value='${s.zoom}' oninput='scienceLabOrbitalZoom(this.value)' aria-label='Zoom the molecular model'><button type='button' onclick='scienceLabOrbitalResetView()'>Reset view</button></div><div class='orbital-density-control'><button type='button' id='orbitalDensityToggle' class='orbital-density-toggle' aria-pressed='${s.electronDensity}' onclick='scienceLabOrbitalToggleDensity()'>${s.electronDensity ? 'Hide Python-simulated electron density' : 'Show Python-simulated electron density'}</button><span id='orbitalDensityStatus'>${s.electronDensity ? 'Dot density indicates approximate electron probability, not particle paths.' : 'Optional density view · offline Gaussian-AO / LCAO model.'}</span></div></div><div id='orbitalLabStatus' class='lab-status-line orbital-status-line' role='status' aria-live='polite'>${status}</div><div class='orbital-model-note'><b>Model note:</b> the orbitals are simplified educational shapes. The optional density overlay is generated with a Python Gaussian atomic-orbital / LCAO approximation; it illustrates probability by orbital state, not moving electron paths or a self-consistent quantum-chemistry calculation. Neither view is to scale.</div><details class='lab-explain orbital-explanation'><summary>Optional explanation · show the chemistry</summary><p>${scienceLabEscape(m.lesson)}</p><p>${scienceLabEscape(m.vsepr.explanation)}</p></details></section><aside class='lab-control-panel orbital-control-panel'><div class='lab-control-title'><span>CHOOSE A MOLECULE</span><b>Drag · build · compare</b></div><label for='orbitalMolecule' class='orbital-select-label'>Molecule preset</label><select id='orbitalMolecule' class='orbital-molecule-select' onchange='scienceLabOrbitalSelectMolecule(this.value)'>${options}</select>${modeTabs}${readout}${buildPanel}<div class='lab-mini-stats orbital-mini-stats'><span>BUILDS COMPLETED <b>${stats.wins || 0}</b></span><span>MOLECULES EXPLORED <b>${SCIENCE_LAB_ORBITAL_MOLECULES.length}</b></span></div></aside></div></section>`;
}
