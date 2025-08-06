function onFormSubmit(e){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Respuestas de formulario 1');
  const lastRow = sheet.getLastRow();
  const inputCol = 2;

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  let invalidCol = headers.indexOf('SKU no identificada') + 1;
  if (invalidCol === 0){
    invalidCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, invalidCol).setValue('SKU no identificada');
  }

  let eanCol = headers.indexOf('EAN identificados') + 1;
  if (eanCol === 0){
    eanCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, eanCol).setValue('EAN identificados');
  }

  let upcCol = headers.indexOf('UPC identificado') + 1;
  if (upcCol === 0){
    upcCol = sheet.getLastColumn() + 1;
    sheet.getRange(1, upcCol).setValue('UPC identificado');
  }

  let rawInput = sheet.getRange(lastRow, inputCol).getValue();

  if (!rawInput || typeof rawInput !== 'string'){
    sheet.getRange(lastRow, inputCol).setComment('⚠️ El campo está vacío o no contiene texto');
    return;
  }

  rawInput = rawInput.replace(/\s+/g, '').toUpperCase();

  if (rawInput.length === 0){
    sheet.getRange(lastRow, inputCol).setComment('⚠️ Entrada vacía después de eliminar espacios.');
    return;
  }

  const skuPattern = /[A-Z]{4}[0-9]{5}/g;
  const eanPattern = /\d{13}/g;
  const upcPattern = /\d{12}/g;

  const allSku = rawInput.match(skuPattern) || [];

  // Paso 1: eliminar los SKU del texto
  let cleanedText = rawInput;
  allSku.forEach(code => cleanedText = cleanedText.replace(code, ''));

  // Paso 2: dividir texto restante en fragmentos (mínimo 12 caracteres)
  let possibleInvalids = cleanedText.match(/.{12,}/g) || [];

  // Paso 3: evaluar EAN y luego UPC en los fragmentos restantes
  const detectedEans = [];
  const detectedUpcs = [];
  const confirmedInvalids = [];

  for (let fragment of possibleInvalids){
    let remaining = fragment;

    // Buscar EAN dentro del fragmento
    const eanMatches = remaining.match(eanPattern) || [];
    if (eanMatches.length > 0){
      detectedEans.push(...eanMatches);
      eanMatches.forEach(ean => {
        remaining = remaining.replace(ean, '');
      });
    }

    // Buscar UPC en el string restante
    const upcMatches = remaining.match(upcPattern) || [];
    if (upcMatches.length > 0){
      detectedUpcs.push(...upcMatches);
      upcMatches.forEach(upc => {
        remaining = remaining.replace(upc, '');
      });
    }

    // Lo que queda es verdaderamente inválido
    if (remaining.trim().length > 0){
      confirmedInvalids.push(remaining);
    }
  }

  // Eliminar duplicados
  const finalSku = [...new Set(allSku)];
  const finalEan = [...new Set(detectedEans)];
  const finalUpc = [...new Set(detectedUpcs)];

  // Guardar SKU
  if (finalSku.length > 0){
    sheet.getRange(lastRow, inputCol).setValue(finalSku.join('\n'));
  } else {
    sheet.getRange(lastRow, inputCol).setComment('⚠️ No se encontraron SKU válidos');
  }

  // Guardar EAN
  if (finalEan.length > 0){
    sheet.getRange(lastRow, eanCol).setValue(finalEan.join('\n'));
  }

  // Guardar UPC
  if (finalUpc.length > 0){
    sheet.getRange(lastRow, upcCol).setValue(finalUpc.join('\n'));
  }

  // Guardar inválidos
  if (confirmedInvalids.length > 0){
    sheet.getRange(lastRow, invalidCol).setValue(confirmedInvalids.join('\n'));
    sheet.getRange(lastRow, inputCol).setComment('⚠️ Algunos códigos fueron ignorados por formato incorrecto');
  }
}
