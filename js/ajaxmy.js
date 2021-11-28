$(document).ready(function () {
    // show data

    function showdata() {
        out = "";
        $.ajax({
            url: "./retrieve.php",
            method: "GET",
            dataType: "json",
            success: function (data) {
                // console.log(data);
                if (data) {
                    x = data;
                } else {
                    x = "";
                }
                for (i = 0; i < x.length; i++) {
                    out += "<tr><td>" + x[i].id +
                        "</td><td>" + x[i].First +
                        "</td><td>" + x[i].last +
                        "</td><td>" + x[i].email +
                        "</td><td>" + x[i].mobile +
                        "</td><td>" + "<button class='btn btn-danger btn-sm btn-del'  data-sid=" + x[i].id + "> Delete.</button>" + "</td></tr>";
                }
                $("#tbody").html(out);
            },
        });
    }// end show data function

    showdata();

    /// input data   
    $("#btnadd").click(function (e) {
        e.preventDefault();
        let id = $("#idid").val();
        let nameF = $("#nameF").val();
        let nameL = $("#nameL").val();
        let email = $("#emailid").val();
        let mobile = $("#mobile").val();

        // console.log(name);
        // console.log(email);
        // console.log(password);
        mydata = { id: id, nameF: nameF, nameL: nameL, email: email, mobile: mobile };
        $.ajax({
            url: "./insert.php",
            method: "POST",
            data: JSON.stringify(mydata),
            success: function (data) {
                console.log(data);
                $("#myform")[0].reset();
                msg = "<h5 class='alert alert-danger mt-4'>" + data + "</h5>";
                $("#msg").html(msg);
                showdata();
            },
        });
    });
    // delete
    $("#tbody").on("click", ".btn-del", function () {
        //   console.log("Delete button ok sior");
        let id = $(this).attr("data-sid")
        // console.log(id);
        mydata = { sid: id };
        // mythis=this;
        $.ajax({
            url: "./delete.php",
            method: "post",
            data: JSON.stringify(mydata),
            success: function (data) {
                // console.log(data);  
                showdata();
                msg = "<div class='alert alert-danger mt-4'>" + "<h1>" + data + "</h1>" + "</div>";
                $("#msg").html(msg);

                //$(mythis).closest("tr").fadeOut();
            },
        });

    });


    $("#tbody").on("click", ".btn-del", function () {
        //   console.log("Delete button ok sior");
        let id = $(this).attr("data-sid")
        // console.log(id);
        mydata = { sid: id };
        // mythis=this;
        $.ajax({
            url: "./delete.php",
            method: "post",
            data: JSON.stringify(mydata),
            success: function (data) {
                // console.log(data);  
                msg = "<div class='alert alert-danger mt-4'>" + "<h1>" + data + "</h1>" + "</div>";
                $("#msg").html(msg);
                showdata();
                //$(mythis).closest("tr").fadeOut();
            },
        });

    });
    //  edit function
    $("#tbody").on("click", ".btn-edit", function () {
        //   console.log("Edit  button ok sior");
        let id = $(this).attr("data-sid")
        // console.log(id);
        mydata = { sid: id };
        // mythis=this;
        $.ajax({
            url: "./edit.php",
            method: "post",
            dataType: "json",
            data: JSON.stringify(mydata),
            success: function (data) {
                // console.log(data);  
                // msg = "<div class='alert alert-danger mt-4'>" + "<h1>" + data + "</h1>" + "</div>";
                // $("#msg").html(msg);
                $("#idid").val(data.id);
                $("#nameid").val(data.name);
                $("#emailid").val(data.email);
                $("#passwordid").val(data.password);
                showdata();
                //$(mythis).closest("tr").fadeOut();
            },
        });

    });

}); //  end ready function