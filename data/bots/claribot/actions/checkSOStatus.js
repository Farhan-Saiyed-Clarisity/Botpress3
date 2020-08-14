/**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} input - An example string variable
   * @param {integer} method - An example string variable
   */
  const myAction = async (input, method) => {
    temp.SOStatus = `SO: ` + input + `Method: ` + method + `Work in Progress!`
  }

  return myAction(args.input, args.method)