const functions = require("./functions");
exports.inviteUser = (req, res) => {
    var invitationBody = req.body;
    const shopId = req.params.shopId;
    const authUrl = "https://url.to.auth.system.com/invitation";
    superagent.post(authUrl)
        .send(invitationBody)
        .then((invitationResponse) => {
            if (invitationResponse.status === 201) {
                functions.createdUser(shopId, invitationResponse).then((data) => {
                    res.json(data);
                }).catch((err) => {
                    res.status(500).json(err);
                })
            } else {
                res.status(400).json({
                    error: true,
                    message: 'User already invited to this shop'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                error: true,
                message: err.message
            });
        });
};
