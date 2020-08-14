/**
   * Small description of your action
   * @title The title displayed in the flow editor
   * @category Custom
   * @author Your_Name
   * @param {string} input - An example string variable
   */
  const myAction = async input => {
    var res = input.match(/^[0-9]{4}&#x2F;[A-Za-z]{2}&#x2F;[0-9]{5}$/g)
    temp.abc = res
    if (res === null) temp.SOInputFormat = false
    else temp.SOInputFormat = true
  }

  return myAction(args.input)