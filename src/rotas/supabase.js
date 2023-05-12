const { createClient } = require('@supabase/supabase-js');
const multer = require('../intermediarios/multer');

const supabaseUrl = 'https://buljkxwxvkykfcnkiazm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bGpreHd4dmt5a2ZjbmtpYXptIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Mzc2MTE1OSwiZXhwIjoxOTk5MzM3MTU5fQ.dh7F55OL9yPE9MkvZBRxxl3ye4k9UkLsENoMwbBIvPs'
const supabase = createClient(supabaseUrl, supabaseKey);



app.post('/upload', multer.single('arquivo'), async (req, res) => {

    const { buffer, originalname } = req.file;
    const filePath = `Imagens/usuarios`;

    const { data, error } = await supabase.storage.from('Imagens').upload(filePath, buffer);

    if (error) {
        console.log(error);
    }

    return res.json({ mensagem: error })
})