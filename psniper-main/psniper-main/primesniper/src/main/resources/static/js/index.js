
function toggleSidebar() {
    const sidebar = document.querySelector('.sideBar');

    sidebar.classList.toggle('active');
}


function openInsertModal() {
    document.getElementById("insertModal").style.display = "block";
}

function closeInsertModal() {
    document.getElementById("insertModal").style.display = "none";
}

function openUpdateModal(id) {

    document.getElementById("updateModal").style.display = "block";

    const itemId = id.getAttribute('data-id');
    // Your logic to open the update modal using the itemId
    console.log("Edit Item ID:", itemId);

    document.getElementById("itemIdUpdate").value = itemId;


}

function closeUpdateModal() {
    document.getElementById("updateModal").style.display = "none";
}


$(document).ready(function() {
    const loadItems = () => {
        $.ajax({
            url: "http://localhost:8081/api/v1/primeSniper/getAllItems",
            type: "GET",
            contentType: "application/json",
            success: function(response) {
                // Check if the data array has elements
                if (response && response.length >= 0) {
                    $(".id").text(response.id);
                    $(".item").text(response.item);
                    $(".price").text(response.price);

                    const itemCardFunc = (data) => {
                        let cardContainer = $(".mainCards");
                        cardContainer.empty();

                        if (data.length !== 0) {
                            data.forEach(items => {
                                const { item, price, id } = items;
                                const card = `
                                    <div class="card">
                                        <img src="/img/sniper6.jpg" alt="Item Image">
                                        <div class="card-content">
                                            <input type="text" hidden id="${id}">
                                            <h2 class="header">Item</h2>
                                            <p class="item">${item}</p>
                                            <h2 class="header">Price</h2>
                                            <p class="price">${price}</p>
                                            <button class="editBtn" data-id="${id}" onclick="openUpdateModal(this)">Edit Item</button>
                                            <button class="deleteBtn" data-id="${id}" onclick="deleteItem(this)">Delete Item</button>
                                            <button id="detailsBtn" data-id="${id}" onclick="getItemDetails(this)">Item Details</button>
                                        </div>
                                    </div>
                                `;

                                // Append each card to the container
                                cardContainer.append(card);
                            });
                        } else {
                            cardContainer.html('<p>NO ITEMS AVAILABLE FOR THIS PAGE</p>');
                        }
                    };

                    itemCardFunc(response);
                } else {
                    // Handle the case when there are no items in the response
                    console.error("No items found in the response.");
                }
            },
            error: function(error) {
                // Handle the error more gracefully
                console.error("AJAX request failed:", error);
            }
        });
    };

    // Call the Main Page function after it's defined
    loadItems();
});






function addItem() {
        let id = $("#insertId").val()
        let item = $("#insertItem").val()
        let price = $('#insertPrice').val()

        let insertData = {
            "id": id,
            "item": item,
            "price": price
        }

        console.log("Not YET success", insertData);


        $.ajax({
            url: "api/v1/primeSniper/addItems",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(insertData),
            success: function (insertData) {
                console.log("ggg success", insertData);

                alert("Item Added successfully");
                // Additional success handling if needed
            },
            error: function (error) {
                console.log("Error updating item: ", error);
                // Additional error handling if needed
                console.log("ggg error", insertData);

            }
        });
    }

$("#addItem").on("click", addItem);


function updateItem() {


    // Get form data
    let formData = {
        id: $("#itemIdUpdate").val(),
        item: $("#itemNameUpdate").val(),
        price: $("#itemPriceUpdate").val()
    };

    // Make AJAX call
    $.ajax({
        type: "PUT",
        url: `api/v1/primeSniper/updates`,
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (formData) {
            console.log("ggg success", formData);

            alert("Update successful");
            // Additional success handling if needed
        },
        error: function (error) {
            console.log("Error updating item: ", error);
            // Additional error handling if needed
            console.log("ggg error", formData);

        }
    });
}

function getItemDetails(id) {

    const itemId = id?.getAttribute('data-id');
    // Your logic to open the update modal using the itemId
    console.log("Edit Item ID:", itemId);

}

function deleteItem(id){

    console.log("Delete Not Yet successfull");
    const itemId = id.getAttribute('data-id');
    // Your logic to delete the item using the itemId
    console.log("Delete Item ID:", itemId);


    $.ajax({
        url: `api/v1/primeSniper/delete/${itemId}`,
        type: "DELETE",
        contentType: "application/json",
        success: function (response) {
            console.log("Delete successful", response);

            alert("Delete successful");
            // Additional success handling if needed
        },
        error: function (error) {
            console.log("Error updating item: ", error);
            // Additional error handling if needed
            console.log("ggg error", insertData);

        }
    });
}



