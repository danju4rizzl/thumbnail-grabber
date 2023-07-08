import { FormEvent, useState } from "react"
import axios from "axios"

function App() {
	const [urlInput, setUrlInput] = useState("")
	const [imgData, setImageData] = useState<string>("")

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		console.log(urlInput)
		if (urlInput.length === 0) {
			alert("Please enter a valid URL")
			return
		}

		try {
			const response = await axios.post(
				`http://localhost:5000/grab`,
				{ url: urlInput },
				{
					headers: {
						"Content-Type": "application/json"
					}
				}
			)
			setImageData(response.data)
			setUrlInput("")
		} catch (err) {
			console.log(err)
			alert("Something went wrong")
			return
		}
	}

	return (
		<main className="">
			<nav className="">
				<h5 className="">Thumbnail Downloader</h5>
			</nav>
			<p>Download thumbnails from any YouTube video</p>
			<form onSubmit={handleSubmit}>
				<input
					type="url"
					placeholder="Enter YouTube video URL"
					onChange={(e) => setUrlInput(e.target.value)}
					value={urlInput}
				/>
				<button type="submit">Get Thumbnail Image</button>
			</form>

			<img src={imgData} alt="" width={700} />
			<button>Download thumbnail</button>
		</main>
	)
}

export default App
