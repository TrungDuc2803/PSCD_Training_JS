import data from "./dt.js";
$(document).ready(() => {
    let tableBody = $("#table-body");
    let select = $("#select");
    let pagination = $("#pagination");
    let searchInput = $("#search");
    let entriesInfo = $("#entries-info");
    let currentPage = 1;
    let entriesPerPage = parseInt(select.val());
    let totalEntries = data.length;

    const filterData = (searchTerm) => {
        const filteredData = [];
        for (let i = 0; i < data.length; i++) {
            const row = data[i];
            let found = false;
            for (const key in row) {
                const value = row[key];
                if (String(value).toLowerCase().includes(searchTerm.toLowerCase())) {
                    found = true; 
                    break;
                }
            }
            if (found) {
                filteredData.push(row);
            }
        }
    
        return filteredData;
    };

    const displayTable = () => {
        let startIndex = (currentPage - 1) * entriesPerPage ;
        let endIndex = startIndex + entriesPerPage;
        let currentData = filterData(searchInput.val()).slice(startIndex, endIndex);

        if (startIndex >= totalEntries) {
            currentPage = Math.ceil(totalEntries / entriesPerPage);
            startIndex = (currentPage - 1) * entriesPerPage;
        }

        let htmlString = "";
        let totalPages = Math.ceil(totalEntries / entriesPerPage);
        currentData.forEach(item => {
            htmlString += "<tr>";
            Object.values(item).forEach(value => {
                htmlString += "<td>" + value + "</td>";
            });
            htmlString += "</tr>";
        });
        tableBody.html(htmlString);
        displayPagination(totalPages);
        showEntriesInfo(currentPage, entriesPerPage, totalEntries);
    };

    const displayPagination = (totalPages) => {
        pagination.empty();
        if(totalPages > 0){
            let prevButton = $('<li class="pagination-btn prev"><a href="#">Previous</a></li>');
            $(prevButton).click(() => {
                if(currentPage > 1){
                    currentPage--;
                    displayTable();
                }
            });

            if(currentPage === 1)
            {   
                $(prevButton).addClass('block');
            }
            pagination.append(prevButton);

            for(let i = 1; i <= totalPages; i++){
                let pageButton = $(`<li class="pagination-btn page ${currentPage === i ? 'active' : ''}"><a href="#">${i}</a></li>`);
                $(pageButton).click(() => {
                    currentPage = i;
                    displayTable();
                });
                pagination.append(pageButton);
            }

            let nextButton = $('<li class="pagination-btn next"><a href="#">Next</a></li>');
            $(nextButton).click(()=>{
                if(currentPage < totalPages)
                {
                    currentPage++;
                    displayTable();
                }
            });
            if(currentPage === totalPages)
            {
                $(nextButton).addClass('block');
            }
            pagination.append(nextButton);
        }
    };

    const showEntriesInfo = (currentPage, entriesPerPage, totalEntries) => {
        let startIndex = (currentPage - 1) * entriesPerPage + 1;
        let endIndex = Math.min(currentPage * entriesPerPage, totalEntries);
        if (currentPage === 0) {
            entriesInfo.html(`Showing 0 to ${endIndex} of ${totalEntries} entries(filtered from ${data.length} total entries)`);
        } 
        else {
            entriesInfo.html(`Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`);
        }
    };

    select.on('change', () =>{
        let newEntriesPerPage = parseInt(select.val());
        let totalPageBeforeChange = Math.ceil(totalEntries / entriesPerPage);
        let currentRow = (currentPage - 1) * entriesPerPage + 1;
        entriesPerPage = newEntriesPerPage;
        currentPage = Math.ceil(currentRow / entriesPerPage);
        if (currentPage > totalPageBeforeChange) {
            currentPage = totalPageBeforeChange;
        }
        displayTable();
    });

    searchInput.on("input", function() {
        const searchTerm = $(this).val();
        const filteredData = filterData(searchTerm);
        currentPage = 1;
        totalEntries = filteredData.length;
        displayTable();
    });  

    let sortDirection = "asc"; 

    $(".table-title").click(function() {
        const column = $(this).data("colomn");
        toggleSortDirection(); // Chuyển đổi hướng sắp xếp
        sortTable(column);
        displayTable();
    });

    const toggleSortDirection = () => {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
    };

    const sortTable = (column) => {
        data.sort((a, b) => {
            const valueA = a[column];
            const valueB = b[column];
            if(sortDirection === "asc")
            {
                return valueA.localeCompare(valueB);
            }
            else{
                return valueB.localeCompare(valueA);
            }
            
        });
    };
    
    displayTable();
});
