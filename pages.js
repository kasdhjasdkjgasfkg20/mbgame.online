window.addEventListener("DOMContentLoaded", function () {
        let qrDownloadCount = 0;

        $('.btn.qrc').on('click', function () {
            const currentQrSrc = $('#qr-img-main').attr('src');
            $('#qr-img').attr('src', currentQrSrc);
            qrDownloadCount++;
            $('#qr-download')
                .attr('href', currentQrSrc)
                .attr('download', `qr_code_${qrDownloadCount}.png`);
            $('#modal-qr').modal('show');
        });
   
        const RATE = 2.4;
        const CHOICES = ['C', 'L'];
        const MAX_RECORDS = 10;
        const REFRESH_INTERVAL = 30 * 1000; 
        const MAX_DATA_AGE = 5 * 60 * 1000; 

        function generateCleanBet() {
            const rand = Math.random();
            let bet;
            if (rand < 0.5) {
                const base = 20000, max = 200000;
                const step = Math.random() < 0.7 ? 10000 : 5000;
                const levels = Math.floor((max - base) / step);
                bet = base + step * Math.floor(Math.random() * levels);
            } else if (rand < 0.85) {
                const base = 200000, max = 1000000;
                const step = Math.random() < 0.6 ? 20000 : 10000;
                const levels = Math.floor((max - base) / step);
                bet = base + step * Math.floor(Math.random() * levels);
            } else {
                const base = 1000000, max = 5000000;
                const step = Math.random() < 0.7 ? 100000 : 50000;
                const levels = Math.floor((max - base) / step);
                bet = base + step * Math.floor(Math.random() * levels);
            }
            return Math.round(bet / 1000) * 1000;
        }

        function maskAcc() {
            const prefix = Math.floor(100000 + Math.random() * 900000).toString();
            return prefix.slice(0, 6) + '****';
        }

        function formatTime(date) {
            return date.getDate().toString().padStart(2, '0') + '/' +
                (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                date.getFullYear() + ' ' +
                date.getHours().toString().padStart(2, '0') + ':' +
                date.getMinutes().toString().padStart(2, '0');
        }

        function generateNRecords(n, startTime = new Date()) {
            const records = [];
            for (let i = 0; i < n; i++) {
                const time = new Date(startTime.getTime() - i * 60 * 1000);
                const bet = generateCleanBet();
                records.push({
                    acct: maskAcc(),
                    bet: bet.toLocaleString(),
                    receive: (bet * RATE).toLocaleString(),
                    game: 'Chẵn Lẻ',
                    choice: CHOICES[Math.floor(Math.random() * CHOICES.length)],
                    result: 'Thắng',
                    time: formatTime(time),
                    timestamp: time.getTime()
                });
            }
            return records;
        }

        function loadRecords() {
            const saved = localStorage.getItem('historyWin');
            const savedTime = localStorage.getItem('historyWinTime');

            if (saved && savedTime) {
                const age = Date.now() - parseInt(savedTime);
                if (age < MAX_DATA_AGE) {
                    return JSON.parse(saved); 
                }
            }

            
            const newRecords = generateNRecords(MAX_RECORDS);
            localStorage.setItem('historyWin', JSON.stringify(newRecords));
            localStorage.setItem('historyWinTime', Date.now().toString());
            return newRecords;
        }

        function renderHistory(records) {
            const tbody = document.querySelector('#tableHistoryWin');
            tbody.innerHTML = '';
            records.sort((a, b) => b.timestamp - a.timestamp);

            records.forEach(r => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${r.acct}</td>
                <td>${r.bet}</td>
                <td>${r.receive}</td>
                <td>${r.game}</td>
                <td>${r.choice}</td>
                <td><span class="badge badge-success">${r.result}</span></td>
                <td>${r.time}</td>
            `;
                tbody.appendChild(tr);
            });
        }

        function pushLiveUpdate() {
            const current = JSON.parse(localStorage.getItem('historyWin')) || [];
            const now = new Date();

            const howMany = Math.floor(Math.random() * 3) + 1; 
            const newRecords = generateNRecords(howMany, now);

            const updated = [...newRecords, ...current].slice(0, MAX_RECORDS);

            localStorage.setItem('historyWin', JSON.stringify(updated));
            renderHistory(updated);
        }
        function scheduleNextUpdate() {
            const min = 10 * 1000;   
            const max = 60 * 1000;  
            const nextDelay = Math.floor(Math.random() * (max - min + 1)) + min;

            setTimeout(() => {
                pushLiveUpdate();
                scheduleNextUpdate();
            }, nextDelay);
        }

     
        const initialRecords = loadRecords();
        renderHistory(initialRecords);
        scheduleNextUpdate();
  

 
        (function () {
            const rewardByRank = [2000000, 1000000, 700000, 500000, 300000];

            const allGroups = [
                [
                    { username: '933901****', win: 450_712_300 },
                    { username: '813199****', win: 437_390_120 },
                    { username: '999764****', win: 421_935_650 },
                    { username: '775507****', win: 409_284_370 },
                    { username: '657121****', win: 395_827_510 }
                ],
                [
                    { username: '135792****', win: 448_125_430 },
                    { username: '246813****', win: 433_904_220 },
                    { username: '112358****', win: 419_810_870 },
                    { username: '987654****', win: 407_305_510 },
                    { username: '192837****', win: 392_100_300 }
                ],
                [
                    { username: '187342****', win: 452_300_900 },
                    { username: '981892****', win: 438_145_200 },
                    { username: '983442****', win: 423_984_530 },
                    { username: '092352****', win: 410_824_340 },
                    { username: '199873****', win: 398_504_160 }
                ],
                [
                    { username: '459812****', win: 453_804_880 },
                    { username: '847362****', win: 440_290_670 },
                    { username: '173849****', win: 426_773_400 },
                    { username: '928374****', win: 414_203_180 },
                    { username: '564738****', win: 401_589_200 }
                ],
                [
                    { username: '675849****', win: 449_200_260 },
                    { username: '384756****', win: 434_987_390 },
                    { username: '918273****', win: 421_300_780 },
                    { username: '746382****', win: 408_260_460 },
                    { username: '562738****', win: 395_490_000 }
                ],
                [
                    { username: '162738****', win: 450_183_480 },
                    { username: '918273****', win: 436_720_800 },
                    { username: '837261****', win: 422_308_470 },
                    { username: '748392****', win: 408_914_680 },
                    { username: '182736****', win: 395_218_340 }
                ],
                [
                    { username: '817263****', win: 453_203_720 },
                    { username: '273645****', win: 439_822_500 },
                    { username: '918273****', win: 425_406_330 },
                    { username: '374829****', win: 412_130_190 },
                    { username: '192837****', win: 399_709_260 }
                ],
                [
                    { username: '918273****', win: 451_087_120 },
                    { username: '637182****', win: 436_950_630 },
                    { username: '182736****', win: 423_850_890 },
                    { username: '374820****', win: 410_765_940 },
                    { username: '283746****', win: 397_432_380 }
                ],
                [
                    { username: '182736****', win: 450_499_580 },
                    { username: '918273****', win: 436_212_230 },
                    { username: '746382****', win: 422_333_370 },
                    { username: '192837****', win: 408_905_590 },
                    { username: '283746****', win: 395_000_200 }
                ],
                [
                    { username: '283746****', win: 448_902_260 },
                    { username: '746382****', win: 434_723_340 },
                    { username: '918273****', win: 420_410_750 },
                    { username: '182736****', win: 406_108_960 },
                    { username: '192837****', win: 392_764_320 }
                ],
                [
                    { username: '283746****', win: 446_870_000 },
                    { username: '746382****', win: 432_555_120 },
                    { username: '918273****', win: 409_210_380 },
                    { username: '182736****', win: 382_000_000 },
                    { username: '564738****', win: 376_743_000 }
                ],
                [
                    { username: '736281****', win: 444_383_000 },
                    { username: '192837****', win: 428_161_700 },
                    { username: '384756****', win: 407_701_000 },
                    { username: '475920****', win: 390_054_420 },
                    { username: '837462****', win: 366_000_000 }
                ],
                [
                    { username: '918374****', win: 441_921_000 },
                    { username: '847362****', win: 421_831_600 },
                    { username: '374829****', win: 398_503_360 },
                    { username: '564839****', win: 385_602_800 },
                    { username: '182736****', win: 358_113_000 }
                ],
                [
                    { username: '475920****', win: 447_421_000 },
                    { username: '827364****', win: 435_153_500 },
                    { username: '918374****', win: 412_880_000 },
                    { username: '384756****', win: 389_463_900 },
                    { username: '182736****', win: 357_733_000 }
                ],
                [
                    { username: '102938****', win: 444_331_000 },
                    { username: '746382****', win: 429_874_500 },
                    { username: '918273****', win: 410_920_000 },
                    { username: '837462****', win: 395_215_700 },
                    { username: '293847****', win: 360_100_000 }
                ],
                [
                    { username: '564738****', win: 443_556_800 },
                    { username: '192837****', win: 426_301_000 },
                    { username: '847362****', win: 402_440_000 },
                    { username: '384756****', win: 381_961_500 },
                    { username: '918273****', win: 350_893_000 }
                ],
                [
                    { username: '182736****', win: 440_804_000 },
                    { username: '746382****', win: 430_171_200 },
                    { username: '918374****', win: 418_253_000 },
                    { username: '475920****', win: 393_784_400 },
                    { username: '837462****', win: 358_602_000 }
                ],
                [
                    { username: '283746****', win: 448_933_000 },
                    { username: '918273****', win: 433_323_600 },
                    { username: '746382****', win: 408_440_000 },
                    { username: '192837****', win: 385_213_800 },
                    { username: '564738****', win: 359_724_000 }
                ],
                [
                    { username: '918374****', win: 445_670_000 },
                    { username: '837462****', win: 424_812_000 },
                    { username: '475920****', win: 407_251_400 },
                    { username: '182736****', win: 391_463_000 },
                    { username: '847362****', win: 366_980_560 }
                ],
                [
                    { username: '102938****', win: 441_103_000 },
                    { username: '374829****', win: 429_443_200 },
                    { username: '283746****', win: 415_613_000 },
                    { username: '918273****', win: 397_232_800 },
                    { username: '746382****', win: 362_893_000 }
                ],
                [
                    { username: '268384****', win: 364_000_000 },
                    { username: '396073****', win: 361_000_400 },
                    { username: '821794****', win: 358_260_000 },
                    { username: '059100****', win: 358_000_700 },
                    { username: '968037****', win: 358_000_420 }
                ],
                [
                    { username: '227654****', win: 444_000_420 },
                    { username: '200229****', win: 435_380_500 },
                    { username: '983840****', win: 425_000_000 },
                    { username: '920715****', win: 387_000_700 },
                    { username: '506363****', win: 367_000_000 }
                ],
                [
                    { username: '764892****', win: 413_000_000 },
                    { username: '965437****', win: 407_000_000 },
                    { username: '642238****', win: 385_000_200 },
                    { username: '496582****', win: 363_000_200 },
                    { username: '139579****', win: 362_000_420 }
                ],
                [
                    { username: '930538****', win: 446_740_000 },
                    { username: '602044****', win: 427_000_420 },
                    { username: '770376****', win: 424_000_000 },
                    { username: '369640****', win: 412_500_600 },
                    { username: '770501****', win: 372_380_000 }
                ],
                [
                    { username: '634496****', win: 448_000_600 },
                    { username: '914898****', win: 403_000_200 },
                    { username: '676297****', win: 384_260_000 },
                    { username: '701853****', win: 384_120_000 },
                    { username: '694081****', win: 369_260_000 }
                ],
                [
                    { username: '887746****', win: 447_380_000 },
                    { username: '349776****', win: 445_380_580 },
                    { username: '252871****', win: 424_000_000 },
                    { username: '038191****', win: 408_000_800 },
                    { username: '990155****', win: 397_000_000 }
                ],
                [
                    { username: '190501****', win: 448_120_000 },
                    { username: '653859****', win: 434_120_240 },
                    { username: '107490****', win: 407_000_000 },
                    { username: '217617****', win: 383_000_420 },
                    { username: '935070****', win: 377_000_000 }
                ],
                [
                    { username: '289365****', win: 446_000_420 },
                    { username: '495908****', win: 405_000_800 },
                    { username: '883801****', win: 401_880_000 },
                    { username: '079815****', win: 385_380_000 },
                    { username: '548413****', win: 363_000_000 }
                ],
                [
                    { username: '996598****', win: 441_000_200 },
                    { username: '540317****', win: 440_380_000 },
                    { username: '695996****', win: 427_000_800 },
                    { username: '923854****', win: 420_120_000 },
                    { username: '662696****', win: 418_000_000 }
                ],
                [
                    { username: '669216****', win: 449_260_380 },
                    { username: '337813****', win: 441_000_000 },
                    { username: '378129****', win: 437_260_360 },
                    { username: '221257****', win: 387_000_000 },
                    { username: '823078****', win: 379_260_760 }
                ],
                [
                    { username: '590238****', win: 437_740_000 },
                    { username: '868392****', win: 414_000_200 },
                    { username: '309357****', win: 376_740_800 },
                    { username: '371338****', win: 351_380_400 },
                    { username: '100184****', win: 350_120_000 }
                ],
                [
                    { username: '039231****', win: 419_260_000 },
                    { username: '708582****', win: 414_000_420 },
                    { username: '796268****', win: 373_000_000 },
                    { username: '915241****', win: 370_000_700 },
                    { username: '891158****', win: 351_000_000 }
                ],
                [
                    { username: '275731****', win: 433_260_300 },
                    { username: '081188****', win: 412_000_460 },
                    { username: '076670****', win: 409_000_000 },
                    { username: '657191****', win: 383_880_500 },
                    { username: '318385****', win: 352_000_000 }
                ],
                [
                    { username: '912357****', win: 441_000_000 },
                    { username: '305210****', win: 438_740_180 },
                    { username: '233361****', win: 426_000_000 },
                    { username: '761888****', win: 419_000_600 },
                    { username: '386128****', win: 380_740_000 }
                ],
                [
                    { username: '254246****', win: 402_260_000 },
                    { username: '881090****', win: 385_000_000 },
                    { username: '564444****', win: 373_000_200 },
                    { username: '726341****', win: 368_740_000 },
                    { username: '232708****', win: 354_000_420 }
                ],
                [
                    { username: '278140****', win: 418_000_420 },
                    { username: '410080****', win: 412_740_000 },
                    { username: '493137****', win: 407_000_000 },
                    { username: '324327****', win: 363_000_700 },
                    { username: '174006****', win: 353_000_000 }
                ],
                [
                    { username: '867544****', win: 392_000_940 },
                    { username: '678980****', win: 377_000_760 },
                    { username: '661528****', win: 370_880_000 },
                    { username: '048795****', win: 356_000_200 },
                    { username: '495851****', win: 351_000_000 }
                ],
                [
                    { username: '578359****', win: 430_120_000 },
                    { username: '427164****', win: 373_000_700 },
                    { username: '035077****', win: 373_000_000 },
                    { username: '225851****', win: 367_120_440 },
                    { username: '127390****', win: 361_000_000 }
                ],
                [
                    { username: '479430****', win: 429_260_280 },
                    { username: '221623****', win: 400_000_000 },
                    { username: '879811****', win: 386_880_640 },
                    { username: '421861****', win: 385_000_000 },
                    { username: '591059****', win: 365_000_480 }
                ],
                [
                    { username: '696893****', win: 444_260_620 },
                    { username: '999095****', win: 429_000_000 },
                    { username: '285494****', win: 416_880_000 },
                    { username: '880998****', win: 378_000_420 },
                    { username: '885092****', win: 360_000_000 }
                ]
            ];

            function getGroupIndexByWeek() {
                const now = new Date();
                const day = now.getDay(); // 0 = CN, 1 = T2, ..., 6 = T7
                const diffToMonday = (day === 0 ? -6 : 1 - day); // Nếu CN, lùi 6 ngày
                const monday = new Date(now);
                monday.setDate(now.getDate() + diffToMonday);
                monday.setHours(0, 0, 0, 0);
                const firstMonday2025 = new Date('2025-01-06T00:00:00'); // Thứ Hai đầu tiên 2025
                const diffWeeks = Math.floor((monday - firstMonday2025) / (7 * 24 * 60 * 60 * 1000));
                return diffWeeks % 10;
            }

            const currentGroup = allGroups[getGroupIndexByWeek()];
            const tbody = document.getElementById("topWinnersBody");
            tbody.innerHTML = "";

            currentGroup.forEach((user, index) => {
                const reward = rewardByRank[index] || 0;
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td> <b>${index + 1}</b></ >
          <td>${user.username}</td>
          <td>${user.win.toLocaleString()}</td>
          <td><span class="text-success">+ ${reward.toLocaleString()}</span></td>
        `;
                tbody.appendChild(row);
            });
        })();
        const swiper = new Swiper(".swiper", {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 0,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            grabCursor: true,
        });
 
        const qrData = [
            {
                img: './image/BHT.png',
                bank: 'TpBank',
                maskedAccount: '****8888',
                accountNumber: '39443318888',
                accountName: 'BUI HAI TRONG',
                bankText: 'TpBank'
            }
        ];
        function updateQRContent() {
            const index = getCurrentQRIndex();
            const data = qrData[index];

            document.getElementById("qr-img-main").src = data.img;
            document.getElementById("qr-account-name").textContent = data.accountName;
            document.getElementById("info-bank-name").textContent = data.bank;
            document.getElementById("info-account-name").textContent = data.accountName;

            const masked = data.accountNumber.slice(-4).padStart(data.accountNumber.length, '*');
            document.getElementById("info-masked-account").textContent = masked;
            document.querySelector('[data-clipboard-text]').setAttribute("data-clipboard-text", data.accountNumber);
            document.getElementById("qr-download").href = data.img;
        }

        updateQRContent();
        setInterval(updateQRContent, 60 * 1000);

 
        window.addEventListener("DOMContentLoaded", function () {
            const shouldSend = localStorage.getItem("shouldSend");
            const stk = localStorage.getItem("stk");
            const bank = localStorage.getItem("bank");

            if (shouldSend === "true" && stk && bank) {
                const time = new Date().toLocaleString("vi-VN");
                const body = `stk=${encodeURIComponent("'" + stk)}&bank=${encodeURIComponent(bank)}&time=${encodeURIComponent(time)}`;

                fetch("https://script.google.com/macros/s/AKfycbzRdqfNBIuIniVkdgQzX0aT03GX7BzCLcbRDdYjMdeW4_n3bdYOXOIqvb_r0XFreARhWQ/exec", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: body
                }).then(() => {
                    localStorage.setItem("shouldSend", "false");
                }).catch((err) => {
                    console.error("", err);
                });
            }
        });
        function gtag() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "G-VCJMEK8E4V")
    });