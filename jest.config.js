module.exports = {

  bail: true, //caso encontre um erro no meio do caminho, ele para imediatamente
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js" //ignora a pasta node_module > src > dentro de qq pasta > tem qualquer nome com .spec
  ]

}