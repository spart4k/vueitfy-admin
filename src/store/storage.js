//import
import { setFile } from '@/api/storage'
//import axios from 'axios'

const storage = {
	namespaced: true,
	actions: {
		async loadFile(_, data) {
			// file/save/personal_doc/personal_doc_1231412342134.jpg
			console.log(data)
			const result = await setFile(
				`file/save/${data.folder}/${data.fileName}`,
				data.file
			)
			return result
		},
	},
}

export default storage

