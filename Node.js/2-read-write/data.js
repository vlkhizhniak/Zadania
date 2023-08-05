const fs = require('fs');
const path = require('path');
// Function saveData
function saveData(pathToFiles, folder, overwrite) {
    let checkOverWrite
    // Check the directory to take data
    fs.readdir(path.join(__dirname, pathToFiles), function (err, files) {
        if (err) {
            console.log(err)
        } else {
            // Open data file
            files.forEach(function (file) {
                fs.readFile(path.join(__dirname, pathToFiles, file), 'utf-8', function (err, data) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        parsedData = JSON.parse(data);
                        // Making directory to save new data
                        fs.mkdir(path.join(__dirname, folder), function (err) {
                            if (err) {
                                if (err.code === 'EEXIST') {
                                    console.log('Folder already exist')
                                }
                                else {
                                    console.log(err);
                                }
                            }
                        });
                        // Checking if OverWrite is enabled
                        fs.readdir(path.join(__dirname, folder), 'utf-8', function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                let checkOverWrite = data
                            }
                        });
                        // Checking if overwrite is needed
                        if (checkOverWrite !== '' && overwrite === false) {
                            console.log('Error: EEXIST: File already exist. If you want to overwrite it change overwrite parameter')
                        } else {
                            // Overwriting or creating new data
                            for (let i of parsedData) {
                                fs.writeFile(path.join(__dirname, folder, `${i['id']} ${i['name']}.txt`),
                                    `Name: ${i['name'].split(' ')[0]} \nSurname: ${i['name'].split(' ')[1]}\nStreet: ${i['address']['street']} \nZip Code: ${i['address']['zipcode']}\nCity: ${i['address']['city']} \nPhone: ${i['phone']}`,
                                    function (err) { 
                                        if (err){
                                            console.log(err)
                                        };
                                     });
                            }
                        }
                        console.log('Files updated successfully')
                    }
                })
            });
        }
    })
};
module.exports={
    saveData: saveData
};
saveData('data', 's', true);