function createZip() {
    let data = {
        title: "# REMEDY FOLDER TICKET GENERATOR\n\n",
        name: document.getElementById('name').value,
        summary: document.getElementById('summary').value,
        tasStart: document.getElementById('tasStart').value,
        tasStartTime: document.getElementById('tasStartTime').value,
        tas: document.getElementById('tas').value,
        message: document.getElementById('message').value
    };

    let regex = /(\d{4}\/\d{2}\/\d{2})\s(\d{2}:\d{2}:\d{2})/;
    let summaryDateTimeMatch = data.summary.match(regex);
    let tasStartDate = summaryDateTimeMatch ? summaryDateTimeMatch[1] : '';
    let tasStartTime = summaryDateTimeMatch ? summaryDateTimeMatch[2] : '';

    let markdownData = `${data.title}### Información del Ticket\n\n**Nombre:** ${data.name}\n**Fecha Inicio TAS:** ${tasStartDate}\n**Hora Inicio TAS:** ${tasStartTime}\n**Summary:** ${data.summary}\n**TAS:** ${data.tas}\n\n---\n\n**Mensaje:**\n${data.message}`;

    let zip = new JSZip();
    let folder = zip.folder(`${data.tas}`);
    folder.file(`${data.tas}.md`, markdownData);

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            let a = document.createElement("a");
            a.download = `${tasStartDate}_${data.tas}.zip`;
            a.href = window.URL.createObjectURL(content);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
}

function extractTASDateTime() {
    let summary = document.getElementById('summary').value;
    let regex = /(\d{4})\/(\d{2})\/(\d{2})\s(\d{2}:\d{2}:\d{2})/;
    let summaryDateTimeMatch = summary.match(regex);
    if (summaryDateTimeMatch) {
        let tasStartDate = `${summaryDateTimeMatch[1]}-${summaryDateTimeMatch[2]}-${summaryDateTimeMatch[3]}`; // Formato yyyy-MM-dd
        let tasStartTime = summaryDateTimeMatch[4];
        document.getElementById('tasStart').value = tasStartDate;
        document.getElementById('tasStartTime').value = tasStartTime;
    }
}

function autoFillTASPrefix() {
    let tasInput = document.getElementById('tas').value;
    let tasPrefix = tasInput.substring(0, 3).toUpperCase();
    document.getElementById('tasPrefix').value = ['TAS', 'CRQ', 'WO', 'INC'].includes(tasPrefix) ? tasPrefix : '';
}