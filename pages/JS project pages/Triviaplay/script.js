
        const questionElement = document.getElementById('question');
        const answerButtons = [
            document.getElementById('answer-1'),
            document.getElementById('answer-2'),
            document.getElementById('answer-3'),
            document.getElementById('answer-4')
        ];
        const resultElement = document.getElementById('result');
        const scoreElement = document.getElementById('score');
        const resetButton = document.getElementById('reset');

        const questions = [
            { "question": "מהו שם מדינת האי של האי קריביים?", "answers": ["הונדורס", "ג'מייקה", "אורוגוואי", "קולומביה"], "correctAnswer": 1 },
            { "question": "מהי השפה המדוברת ביותר בעולם?", "answers": ["אנגלית", "סינית", "ספרדית", "ערבית"], "correctAnswer": 1 },
            { "question": "איזה גוף נחשב לגורם שמבצע את תהליך הנשימה?", "answers": ["העור", "הריאות", "הכבד", "הלב"], "correctAnswer": 1 },
            { "question": "מהו הים הרחב ביותר?", "answers": ["הים התיכון", "הים האדום", "הים הצפוני", "הים השחור"], "correctAnswer": 0 },
            { "question": "מהו המזון שנחשב לטעים ביותר בעולם?", "answers": ["פיצה", "סושי", "פסטה", "המבורגר"], "correctAnswer": 0 },
            { "question": "מהי העיר אשר נמצאת על שני היבשות, אסיה ואירופה?", "answers": ["איסטנבול", "ברצלונה", "רומא", "פריז"], "correctAnswer": 0 },
            { "question": "מהו צבע הבזיליקום?", "answers": ["ירוק", "אדום", "צהוב", "כחול"], "correctAnswer": 0 },
            { "question": "מי כתב את ספרי 'ההרפתקאות של הילד הארי פוטר'?", "answers": ["ג'ורג' אורוול", "ג'יי קיי רולינג", "לואיס קרול", "הנס כריסטיאן אנדרסן"], "correctAnswer": 1 },
            { "question": "מהי הגבעה שמרבית המבקרים פוגשים כאתר בולט בהודו?", "answers": ["ההימלאיה", "הר האוורסט", "ההר ראג'מא", "ההר חימלאיה"], "correctAnswer": 0 },
            { "question": "מהי בירת ישראל?", "answers": ["תל אביב", "חיפה", "ירושלים", "באר שבע"], "correctAnswer": 2 },
            { "question": "מהו צבע השמיים ביום בהיר?", "answers": ["אדום", "כחול", "ירוק", "צהוב"], "correctAnswer": 1 },
            { "question": "כמה ימים יש בשנה מעוברת?", "answers": ["365", "366", "367", "368"], "correctAnswer": 1 },
            { "question": "מהו החודש האחרון בשנה?", "answers": ["נובמבר", "דצמבר", "יולי", "אוגוסט"], "correctAnswer": 1 },
            { "question": "איזו עיר היא בירת צרפת?", "answers": ["ברצלונה", "פריז", "רומא", "לונדון"], "correctAnswer": 1 }
        ];

        let score = 0;
        let currentQuestionIndex = 0;

        function displayQuestion() {
            const questionData = questions[currentQuestionIndex];
            questionElement.innerText = questionData.question;
            answerButtons.forEach((button, index) => {
                button.innerText = questionData.answers[index];
                button.onclick = () => checkAnswer(index);
            });
        }

        function checkAnswer(selectedIndex) {
            const questionData = questions[currentQuestionIndex];
            if (selectedIndex === questionData.correctAnswer) {
                score += 7.5;
                alert("תשובה נכונה!");
            } else {
                alert("תשובה לא נכונה.");
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                endGame();
            }
        }

        function endGame() {
            document.getElementById('question-area').style.display = 'none';
            resultElement.innerText = `הסך הכל נקודות: ${score}`;
            scoreElement.style.display = 'block';
        }

        resetButton.addEventListener("click", function() {
            score = 0;
            currentQuestionIndex = 0;
            resultElement.innerText = '';
            scoreElement.style.display = 'none';
            document.getElementById('question-area').style.display = 'block';
            displayQuestion();
        });

        displayQuestion();