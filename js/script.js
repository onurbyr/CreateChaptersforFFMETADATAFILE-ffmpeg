var options = {
    twentyFour: true,
    showSeconds: true,
};

$('.timepicker').wickedpicker(options);


convertButton.addEventListener("click", function() {
    var lines = $('#time').val().split('\n');

    function getTimeStamp(time){
        var hr=time[0];
        var min=time[1];
        var sec=time[2];

        var minutes = (hr * 60) + parseInt(min)
        var seconds = parseInt(sec) + (minutes * 60)
        var timestamp = (seconds * 1000)
        
        return timestamp;

    }
    
    var timepicker=document.getElementById("timepicker").value;
    var time=timepicker.split(" : ");
    var videolengthstamp=getTimeStamp(time)-1;


    if (!lines.includes(""))
    {
        var start=[]
        var title=[]

        for(var i = 0;i < lines.length;i++){
            var time=lines[i].split(":");
            var timestamp=getTimeStamp(time);
            start.push(timestamp)
            title.push(lines[i].substr(lines[i].indexOf(' ')+1));
        }

        var end=[]
        for(var i = 1;i < lines.length;i++)
        {
            var time=lines[i].split(":");
            var timestamp=getTimeStamp(time);
            end.push(timestamp-1)
        }
        end.push(videolengthstamp)

        var text=""
        for(var i = 0;i < lines.length;i++)
        {
            text+=`[CHAPTER]\nTIMEBASE=1/1000\nSTART=${start[i]}\nEND=${end[i]}\ntitle=${title[i]}\n\n`
        }

        var blob = new Blob([text], {type: "text/text;charset=utf-8"});
        saveAs(blob, "FFMETADATAFILE");



    }
})



