import jsPDF from "jspdf";

const generatePDF = (result) => {

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(18);
  doc.text("MockMate AI Interview Report", 20, y);

  y += 15;

  doc.setFontSize(12);
  doc.text(
    `Total Score: ${result.totalScore}`,
    20,
    y
  );

  y += 10;

  doc.text(
    `Average Score: ${result.averageScore}`,
    20,
    y
  );

  y += 15;

  result.questions.forEach((q, index) => {

    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);

    doc.text(
      `Question ${index + 1}`,
      20,
      y
    );

    y += 8;

    doc.setFontSize(10);

    doc.text(
      `Q: ${q.questionText}`,
      20,
      y,
      { maxWidth: 170 }
    );

    y += 15;

    doc.text(
      `Answer: ${q.answerText}`,
      20,
      y,
      { maxWidth: 170 }
    );

    y += 20;

    doc.text(
      `Score: ${q.score}/10`,
      20,
      y
    );

    y += 8;

    doc.text(
      `Feedback: ${q.feedback?.overall}`,
      20,
      y,
      { maxWidth: 170 }
    );

    y += 20;

  });

  doc.save(
    "MockMate_AI_Report.pdf"
  );

};

export default generatePDF;