let subtotal = 0;

function addItem() {

    let name = document.getElementById("itemName").value;
    let qty = document.getElementById("qty").value;
    let price = document.getElementById("price").value;
    let discount = document.getElementById("discount").value || 0;

    if (name === "" || qty <= 0 || price <= 0) {
        alert("Please enter valid data");
        return;
    }

    let total = qty * price;

    let discountAmount = total * (discount / 100);

    total = total - discountAmount;

    subtotal += total;

    let table = document.querySelector("#invoiceTable tbody");

    let row = table.insertRow();

    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = qty;
    row.insertCell(2).innerText = price;
    row.insertCell(3).innerText = discount + "%";
    row.insertCell(4).innerText = total.toFixed(2);

    calculateTotal();

}

function calculateTotal() {

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);

    let tax = subtotal * 0.05;

    document.getElementById("tax").innerText = tax.toFixed(2);

    let grandTotal = subtotal + tax;

    document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
    

}

function resetInvoice() {

    location.reload();

}
