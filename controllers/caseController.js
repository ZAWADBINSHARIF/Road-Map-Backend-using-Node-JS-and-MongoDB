// internal import
import Case from '../models/case.js';



export function addCase(req, res) {
    console.log(req.body);
    res.json({ message: 'File uploaded successfully' });
}