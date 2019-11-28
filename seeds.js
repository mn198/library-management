const axios = require('axios');

const token= 'K2FoOgW9EnDSBF1Zg0Wx4bae_ckj5MXuA6psOPrFQnqOCCHvcX5RVYeqw7E-T6T-6G7LOvLeJ1yX3juNWqHIFoGu_2EbKca4I0dK0jXuJZnQ7kOtpKH36ZivqoQ_Q5W1BKtk7QWAO3KONyuuiIDODqPMbYpa7m8z5aMJ8UCr2HfROQO1ynuH8tTVtYRV1ce6HLtLF_CtMp5IRlWGgnDIQmTHda698GnhVMh3SznEUtntEz5YXaDT72SRrcsLR7jLU2cpBSnI0YSXTxaeY5maE6N04_n9enuz60'
axios.get('https://graph.zalo.me/v2.0/me/invitable_friends?access_token=' + token +'&from=0&limit=40&fields=id,name,gender,picture')
	.then((result) => {
		const data = result.data.data;
		for(let i = 0; i < data.length; i++){
			const reader = {
				name: data[i].name,
				gender: data[i].gender,
				address: 'Địa chỉ nhà !',
				email: data[i].name + '@gmail.com',
				introduce: 'Giới thiệu về bản thân.',
				avatar: data[i].picture.data.url,
				dob: new Date(),
			}
			console.log(reader)
			axios.post('http://vast-retreat-33559.herokuapp.com/readers', reader)
		    .then((result) => {
		    	console.log('success')
		    })
		    .catch((err) => console.log('err'))
		}
	})
	