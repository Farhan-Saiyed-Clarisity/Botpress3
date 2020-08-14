const axios = require('axios')

  /**
   * Get FAQs SOP Documents from Oracle CEC
   * @title Get FAQs Documents
   * @category Custom
   * @author Farhan Saiyed
   * @param {string} query - the query parameter
   */
  var documentsCC = []
  var documentCount

  const myAction = async query => {
    var sopDocuments = ''
    var files = []
    var fileCount = 0
    var processed = []

    const folderID = 'FDFB3ED2D4A4B3E55B99667DDA90BA7CC3DDE3EBB2A8'

    let reg = new RegExp('[?]+')
    query = query.replace(reg, '')
    console.log('query: ' + query)
    console.log(typeof query)

    var flag = false
    const response = await axios.get(
      'https://clarisityoce-clarisitypr.cec.ocp.oraclecloud.com/documents/api/1.2/folders/FD2C121205FECB3D751E592908BF16D23A578B36F262/search/items?fulltext=' +
        query,
      {
        //  "/search/items?querytext=fItemNameCONTAINS"+query,
        auth: {
          username: 'pandurang.ranjalkar@clarisity.com',
          password: 'Evergreen@123'
        }
      }
    )
    console.log(response.data)
    if (response.status != 200) {
      console.log('Something Went Wrong!')
    } else {
      var data = response.data
      if (data.totalCount == 0) {
        console.log('No Files Found')
      } else {
        fileCount = parseInt(data.count)
        for (var i = 0; i < parseInt(data.count); i++) {
          var fileTemp = {
            fileID: data.items[i].id,
            fileName: data.items[i].name
          }
          files.push(fileTemp)
        }
      }
      flag = true
      console.log(fileCount)
      console.log(files)
    }
    if (flag) {
      for (var j in files) {
        var response2 = await axios.get(
          'https://clarisityoce-clarisitypr.cec.ocp.oraclecloud.com/documents/api/1.2/publiclinks/file/' +
            files[j].fileID,
          {
            auth: {
              username: 'pandurang.ranjalkar@clarisity.com',
              password: 'Evergreen@123'
            }
          }
        )
        if (response2.status != 200) {
          console.log('Something Went Wrong!')
        } else {
          var data = response2.data
          if (data.count != '0') {
            console.log(data.id + ' Link Exist')
            var sharelink =
              'https://clarisityoce-clarisitypr.cec.ocp.oraclecloud.com/documents/link/' +
              data.items[0].linkID +
              '/fileview/' +
              data.id
            var fileName
            for (var j in files) {
              if (files[j].fileID == data.id) {
                fileName = files[j].fileName
                break
              }
            }
            var temp = {
              label: fileName,
              url: sharelink,
              type: 'file'
            }
            documentsCC.push(temp)
            processed.push(i)
            if (processed.length == fileCount) {
              var documentHyperlinks = ''
              i = 0
              while (documentsCC[i]) {
                documentHyperlinks +=
                  '<br> - <a href="' + documentsCC[i].url + "\" target='_blank'>" + documentsCC[i].label + '</a>'
                i++
              }

              console.log(documentsCC)
              console.log('Please refer below documents for more information: ' + documentHyperlinks)
            }
          } else {
            console.log(data.id + ' Link Does not Exist')
            var response3 = await axios.post(
              'https://clarisityoce-clarisitypr.cec.ocp.oraclecloud.com/documents/api/1.2/publiclinks/file/' +
                data.id +
                '?assignedUsers=@everybody',
              {
                auth: {
                  username: 'pandurang.ranjalkar@clarisity.com',
                  password: 'Evergreen@123'
                }
              }
            )
            if (response3.status != 200) {
              console.log('Something Went Wrong!')
            } else {
              var data = response3.data
              var sharelink =
                'https://clarisityoce-clarisitypr.cec.ocp.oraclecloud.com/documents/link/' +
                data.linkID +
                '/fileview/' +
                data.id
              var fileName
              for (var j in files) {
                if (files[j].fileID == data.id) {
                  fileName = files[j].fileName
                  break
                }
              }
              var temp = {
                label: fileName,
                url: sharelink,
                type: 'file'
              }
              // }
              documentsCC.push(temp)
              processed.push(i)
              if (processed.length == fileCount) {
                var documentHyperlinks = ''
                i = 0
                while (documentsCC[i]) {
                  documentHyperlinks +=
                    '<br><a href="' + documentsCC[i].url + "\" target='_blank'>" + documentsCC[i].label + '</a>'
                  i++
                }
                console.log('Please refer below documents for more information: ' + documentHyperlinks)
              }
            }
          }
        }
      }
    }
    updateVar()
  }

  function updateVar() {
    documentCount = documentsCC.length
    temp.documentCount = documentCount
    if (documentCount >= 1) {
      temp.documentOneLabel = documentsCC[0].label
      temp.documentOneURL = documentsCC[0].url
    }
    if (documentCount >= 2) {
      temp.documentTwoLabel = documentsCC[1].label
      temp.documentTwoURL = documentsCC[1].url
    }
    if (documentCount >= 3) {
      temp.documentThreeLabel = documentsCC[2].label
      temp.documentThreeURL = documentsCC[2].url
    }
    if (documentCount >= 4) {
      temp.documentFourLabel = documentsCC[3].label
      temp.documentFourURL = documentsCC[3].url
    }
  }

  return myAction(args.query)