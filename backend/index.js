const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// JSON body read karne ke liye middleware
app.use(express.json());

// ================= SAMPLE DATA =================
const data = [
    { id: 1, name: 'Ali', age: 25 },
    { id: 2, name: 'Sara', age: 30 }
];

// ================= GET ALL DATA =================
app.get('/getdata', (req, res) => {
    res.json(data);
});

// ================= GET DATA BY ID =================
app.get('/getdata/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Id ke basis pe data dhundh rahe hain
    const item = data.find(d => d.id === id);

    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// ================= SAVE NEW DATA =================
//GO TO THUNDER CLIENT type http://localhost:3000/savedata to save new data list and in the drop
//drop down menu mein POST karna hai
app.post('/savedata', (req, res) => {

    // Body se data aa raha hai
    const newData = req.body;

    // Auto ID generate kar rahe hain
    newData.id = data.length + 1;

    // Data array me push
    data.push(newData);

    res.json({
        message: 'Data saved successfully',
        data: newData
    });
});

// ================= UPDATE DATA BY ID =================
//GO TO THUNDER CLIENT type http://localhost:3000/updatedata to update data list and in the drop
//drop down menu mein PUT karna hai
app.put('/updatedata/:id', (req, res) => {

    // URL se id nikal rahe hain
    const id = parseInt(req.params.id);

    // Body se updated values
    const { name, age } = req.body;

    // Array me id ka index dhundh rahe hain
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {

        // Sirf wahi field update hogi jo body me aayi hai
        if (name !== undefined) data[index].name = name;
        if (age !== undefined) data[index].age = age;

        res.json({
            message: 'Data updated successfully',
            updatedData: data[index]
        });

    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// ================= DELETE DATA BY ID =================
//GO TO THUNDER CLIENT type http://localhost:3000/deletedata to delete data and in the drop
//drop down menu mein DELETE karna hai
app.delete('/deletedata/:id', (req, res) => {

    // URL se id nikal rahe hain
    const id = parseInt(req.params.id);

    // Index find kar rahe hain
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {

        // Data delete kar rahe hain
        data.splice(index, 1);

        res.json({ message: 'Data deleted successfully' });

    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

// ================= SERVER START =================
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
