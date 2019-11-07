import React from 'react';
import Styles from './Styles'
import { Form, Field } from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
	await sleep(300)
	window.alert(JSON.stringify(values, 0, 2))
}

class App extends React.Component {

	state = {
		isShow: false
	}

	checkboxToggle = () => {
		const { isShow } = this.state
		this.setState({ isShow: !isShow })
	}

	render() {
		return (
			<Styles>
				<h1>Заявление на взятие кредита</h1>
				<h2>Заполните форму</h2>
				<Form
					onSubmit={onSubmit}
					validate={values => {
						const errors = {}
						if (!values.lastName) {
							errors.lastName = 'Обязательное поле'
						}
						if (!values.firstName) {
							errors.firstName = 'Обязательное поле'
						}
						if (!values.patronymic) {
							errors.patronymic = 'Обязательное поле'
						}
						if (!values.tel) {
							errors.tel = 'Обязательное поле'
						}
						if (!values.email) {
							errors.email = 'Обязательное поле'
						}
						return errors
					}}
					render={({
						submitError,
						handleSubmit,
						form,
						submitting,
						pristine
					}) => (
							<form onSubmit={handleSubmit}>

								{/* Обязательные для ввода поля */}
								<Field name="lastName">
									{({ input, meta }) => (
										<div>
											<label>Фамилия</label>
											<input {...input} type="text" placeholder="Иванов" />
											{(meta.error || meta.submitError) && meta.touched && (
												<span>{meta.error || meta.submitError}</span>
											)}
										</div>
									)}
								</Field>
								<Field name="firstName">
									{({ input, meta }) => (
										<div>
											<label>Имя</label>
											<input {...input} type="text" placeholder="Иван" />
											{meta.error && meta.touched && <span>{meta.error}</span>}
										</div>
									)}
								</Field>
								<Field name="patronymic">
									{({ input, meta }) => (
										<div>
											<label>Отчество</label>
											<input {...input} type="text" placeholder="Иванович" />
											{meta.error && meta.touched && <span>{meta.error}</span>}
										</div>
									)}
								</Field>


								{/* Необязательное поля, с выпадающим списком */}
								<div>
									<label>Гражданство</label>
									<Field name="citizenship" component="select">
										<option />
										<option value="rus">Россия</option>
										<option value="ucr">Украина</option>
										<option value="bel">Беларусь</option>
									</Field>
								</div>

								{/* Обязательные для ввода поля */}
								<Field name="tel">
									{({ input, meta }) => (
										<div>
											<label>Телефон</label>
											<input {...input} type="tel" placeholder="880005553535" />
											{meta.error && meta.touched && <span>{meta.error}</span>}
										</div>
									)}
								</Field>
								<Field name="email">
									{({ input, meta }) => (
										<div>
											<label>Почта</label>
											<input {...input} type="email" placeholder="example@mail.ru" />
											{meta.error && meta.touched && <span>{meta.error}</span>}
										</div>
									)}
								</Field>

								{/* Чекбокс, который открывает скрываемые блоки */}
								<div className='specify-details'>
									<label>Указать предмет кредита</label>
									<Field name="subject"
										id="showdetails"
										component="input"
										type="checkbox"
										onChange={this.checkboxToggle}
										checked={this.state.isShow}
									/>
								</div>
								
								{/* Скрываемые блоки */}
								<div>
									<label className={this.state.isShow ? "showed" : "hidden"}>Предмет</label>
									<Field
										className={this.state.isShow ? "showed" : "hidden"}
										name="subjectName"
										component="input"
										type="text"
										placeholder='Квартира'
									/>
								</div>
								<div>
									<label className={this.state.isShow ? "showed" : "hidden"}>Стоимость</label>
									<Field
										className={ this.state.isShow ? "showed" : "hidden" }
										name="subjectCost"
										component="input"
										type="text"
										placeholder='от 100000'
									/>
								</div>
								

								{/* Тут производится проверка */}
								{submitError && <div className="error">{submitError}</div>}
								<div className="buttons">
									<button type="submit" disabled={submitting}>
										Отправить
            						</button>
									<button
										type="button"
										onClick={form.reset}
										disabled={submitting || pristine}
									>
										Очистить
            						</button>
								</div>
							</form>
						)}
				/>
			</Styles>
		)
	}
}

export default App;
