# Format SKU
<picture><img src="https://github.com/AaronRHdev/format_sku/blob/main/assets/img/banner.jpeg?raw=true" style="width: 100%"></picture>
![Static Badge](https://img.shields.io/badge/Mercado%20Libre-%23f7cc3e?style=for-the-badge&logo=mercadopago&logoColor=%23051b38)
## The object 🎯
The object of this project is to automate the formatting upon receipt of records in a ```Google Form```. This form is used daily in my job; we use it to maintain control over our team.  

The need arose because, at the moment of receiving the records, these records are stored in the cell in a single line format linked within a spreadsheet in ```Google Sheets```, which makes it difficult to properly view the data. That is why we need the formatting of the received text to be automated so that it has proper readability in the cell.

I work in Mercado Libre, and for me and for my team, it is important to keep track of my colleagues. In daily life, some circumstances that result in lost items, and it is our duty to report the lost object. That is why we decided to create a ```Google Form```; this way, we will be able to visualize all the items that are in the location, and this will be a backup for discrepancies with the reports and the collaborator's version.

To realize one report, the collaborator will fill in all the inputs of the form, and one of these inputs requires scanning all the SKUs(items) into the location, then the collaborator presses the submit button, and he to be able to continue with his tasks.

![Static Badge](https://img.shields.io/badge/Google-%2300897B?style=for-the-badge&logo=google&logoColor=%23FFFFFF)

The problem is the following:  
We observed that in the column where the SKU records are stored, they are formatted in a single line within the column, making it difficult to visualize. Why happen this way?, Because at the moment of scanning the items, our tool does not add a line break, and that stores the SKUs scanned in a single line. If the collaborator adds the line break manually, it will be a loss of time, and the process will be affected, harming productivity.

> This is an example of the form.

<picture><img src="https://github.com/AaronRHdev/format_sku/blob/main/assets/img/example_form.png?raw=true" style="width: 50%"></picture>

We need to automate the formatting in the cell when the records are stored. The proper format is the following:  
* Format of list, without vignettes
* Records in uppercase
* Valid SKU is: 4 characters and 5 numbers -> (ABDC12345)
* Must be able to separate the invalid records

✅ The cell should look like this:  

| Record SKU |
|------------|
| ABDC12345<br>EFGH67890<br>IJKL15690 |  

❌ However, the cell stores the records in this way:
| Record SKU |
|------------|
| ABDC1234EFGH67890IJKL156901 |  

## Solution ☑️

To solve this problem, I built a script to automate the formatting in the cell. I built the script in ```Apps Script``` linked to the spreadsheet in ```Google Sheets```.  

Works in this way:
- It runs automatically when a new response is received from the form.
- It takes the data from a specific column (SKU records).
- Cleans the spaces and converts the text to uppercase.
- Divides the input into blocks of 9 characters.
- Validates that each block has the format of 4 letters followed by 5 numbers.
- Saves the valid blocks in the same cell, in vertical list format.
- Saves the invalid blocks in a new column called "SKU no identificada" also in vertical list format.
- Creates the "Unrecognized SKU" column if it does not exist, without altering other columns.
- Ignores empty or invalid entries without generating errors.

## Steps to install this function 📝

1. Create the form and edit the form
2. Link it to a spreadsheet in  ```Google Sheets``` 
3. Go to "Extensions", next open ```Apps Script```
4. Copy the JavaScript file content in the ```Apps Script``` tab
5. In the ```Apps Script``` tab, go to ⏰ clock icon, next click in ```Activators```
6. Click on ```Add new activator``` button.
7. Adjust these settings:
   |Field|Appropriate selection|
   |-----|---------------------|
   |Function that will be executed|onFormSubmit|
   |Source of the event| From the spreadsheet|
   |Type of event|When submitting the form|
8. Click on ```Save``` button.

Thus, the script will run when the collaborator submits the form.
And the table in the spreadsheets should look like this:  

<picture><img src="https://github.com/AaronRHdev/format_sku/blob/main/assets/img/table_spreadsheet.png?raw=true" style="width: 75%"></picture>

## Technologies used in this project

|Tech|Use|
|-------|---|
|![Static Badge](https://img.shields.io/badge/Google%20Forms-%237248B9?style=for-the-badge&logo=googleforms&logoColor=%23FFFFFF)|To build the form|
|![Static Badge](https://img.shields.io/badge/Google%20Sheets-%2334A853?style=for-the-badge&logo=googlesheets&logoColor=%23FFFFFF)|To create the spreadsheet and connect it with the form|
|![Static Badge](https://img.shields.io/badge/App%20Script-%234285F4?style=for-the-badge&logo=googleappsscript&logoColor=%23FFFFFF)|To connect and implement the script with spreadsheet|
|![Static Badge](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=%23FFFFFF)|To build the script|












