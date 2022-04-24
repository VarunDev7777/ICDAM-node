// function ValidateEmail(mail) {
// 	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
// 		return (true)
// 	}
// 	return (false)
// }

const handlePay = async (element) => {
	let fee = parseInt(element.fee.match(/\d/g).join(""));
	if (fee > 999999) {
		return alert('Fees value should not be more then 999,999')
	}
	// if (ValidateEmail(element.mail) == false) {
	// 	return alert("You have entered an invalid email address!")
	// }
	let country = '';
	// const stripe = await loadStripe(stripePublicKey);
	await fetch('https://extreme-ip-lookup.com/json/?key=fzIZwrnyEfKNb4N4WSRE')
		.then(res => res.json())
		.then(response => {
			country = response.country
		})
		.catch((data, status) => {
			console.log('Request failed', data, status);
		});

	await fetch(`/api/create-checkout-session?category=${element.category}&country=${country}&amount=${fee}`, {
		method: "POST",
	}).then((res) => res.json()).then((res) => {
		if (res.url) {
			window.location.href = res.url
		}
	}).catch((error) => {
		console.log(error)
	});
};

const handleOther = () => {
	const mainDiv = document.querySelector(".backdrop")
	mainDiv.classList.remove("hidden")
	mainDiv.addEventListener("click", function (e) {
		if (e.target.classList.contains("backdrop")) {
			mainDiv.classList.add("hidden")
		}
		if (e.target.classList.contains("submitspmem")) {
			const inpval = document.getElementById("spmem").value
			if (typeof parseInt(inpval) == 'number') {
				handlePay({ category: 'Special Membership', fee: `${parseInt(inpval)}`, mail: '' })
			} else {
				alert('Enter a valid number')
			}
			mainDiv.classList.add("hidden")
		}
	})
}

document.querySelectorAll('.registeration_fee').forEach((ele, ind) => {
	ele.addEventListener("click", () => {
		switch (ind) {
			case 0: handlePay({ category: 'Research Scholar/Student', fee: '30000', mail: '' });
				break;
			case 1: handlePay({ category: 'Academician', fee: '35000', mail: '' });
				break;
			case 2: handlePay({ category: 'Industrial Participant', fee: '10000', mail: '' });
				break;
			case 3: handleOther();
				break;
		}
	})
})

