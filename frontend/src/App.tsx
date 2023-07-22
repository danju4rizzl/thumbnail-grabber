import { FormEvent, useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
	const [urlInput, setUrlInput] = useState("")
	const [imgData, setImageData] = useState<string>("")

	const baseUrl = `${
		import.meta.env.MODE === "development"
			? "http://localhost:5000/"
			: "https://yt-thumbnail-graber-v1.onrender.com/"
	}`

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		// console.log(urlInput)
		if (urlInput.length === 0) {
			alert("Please enter a valid URL")
			return
		}

		try {
			const response = await axios.post(
				`${baseUrl}api/v1/thumbnail`,
				{ url: urlInput },
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
			setImageData(response.data as string)
			setUrlInput("")
		} catch (err) {
			console.log(err)
			alert("Something went wrong")
			return
		}
	}

	return (
		<div>
			<nav className="navigation">
				<img src="/logo.png" alt="site logo" width={"24"} />
				<h5 className="navigation__title">Thumbnail Downloader </h5>
			</nav>
			<main className="main">
				<h3 className="title">Download thumbnails from any YouTube video</h3>
				<form onSubmit={handleSubmit} className="form">
					<input
						type="url"
						placeholder="Enter YouTube video URL"
						onChange={(e) => setUrlInput(e.target.value)}
						value={urlInput}
						className="form__input"
					/>
					<button type="submit" className="btn">
						Get thumbnail
					</button>
				</form>

				<div className="display">
					<img src={imgData} alt="" width={700} className="display__img" />
					{imgData && (
						<a
							href={imgData}
							target="_blank"
							rel="noreferrer"
							className="display__link"
						>
							<button className="btn">Download thumbnail</button>
						</a>
					)}
				</div>
			</main>
		</div>
	)
}

export default App
