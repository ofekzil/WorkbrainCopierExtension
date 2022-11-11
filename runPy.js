

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);

function run_py() {
    $.ajax({
        url: "copyCalendar.py",
        context: document.body
    })
}

//document.getElementById("copy").addEventListener("click", run_py());