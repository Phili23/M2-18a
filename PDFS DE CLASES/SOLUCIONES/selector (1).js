var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (!startEl) {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que coincidan :)
  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl) //true o false
  
  //yo soy el elemento? SI, okay, te guardo en resultSet
  //tengo hijos? Si tengo hijos, tengo que volver a llamar la funcion en ustedes
  var arregloHijos = Array.from(startEl.children)

  for(let i = 0; i < arregloHijos.length; i++) {
    var resultado = traverseDomAndCollectElements(matchFunc, arregloHijos[i])
    resultSet = [...resultSet, ...resultado]
  }
  return resultSet;
};


// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === '#') return 'id'
  if(selector[0] === '.') return 'class'
  if(selector.includes('.')) return 'tag.class'
  //if(selector.split('.').length === 2) return 'tag.class'
  return 'tag'
};
/*
.algo ---> class
#uno ---> id
div
div.class ---> tag.class
*/

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  if (selectorType === "id") {  //deberia devolver true o false
   return (el) => '#' + el.id === selector
    //  if('#' + el.id === selector) {
    //    return true
    //  } else {
    //    return false
    //  }

  } else if (selectorType === "class") {
    return function(el) {
      var claseSinPunto = selector.substring(1)
      var arreglo = el.className.split(' ')
      for(let i = 0; i < arreglo.length; i++) {
        if(arreglo[i] === claseSinPunto) {
          return true
        }
      }
      return false
    }
  } else if (selectorType === "tag.class") {
    return function(el) {
      let [tag, className] = selector.split('.')
      var tagName = el.tagName.toLowerCase()
      var classList = Array.from(el.classList)
      if(tag === tagName) {
        for(let i = 0; i < classList.length; i++) {
          if(classList[i] === className) return true
        }
      } 
      return false
    }
  } else if (selectorType === "tag") {
    return (el) => selector === el.tagName.toLowerCase()
  }
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
//$('.mati')