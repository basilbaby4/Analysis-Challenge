exports.inviteUser = function (req, res) {
    var invitationBody = req.body;
    const shopId = req.params.shopId;
    const authUrl = "https://url.to.auth.system.com/invitation";
    superagent.post(authUrl)
        .send(invitationBody)
        .then((invitationResponse) => {
            if (invitationResponse.status === 201) {
                const createdUser = await User.findOneAndUpdate({
                    authId: invitationResponse.body.authId
                }, {
                    authId: invitationResponse.body.authId,
                    email: invitationBody.email
                }, {
                    upsert: true,
                    new: true
                });
                const shop = await Shop.findById(shopId).exec();
                if (shop) {
                    if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
                        shop.invitations.push(invitationResponse.body.invitationId);
                    }
                    if (shop.users.indexOf(createdUser._id) === -1) {
                        shop.users.push(createdUser);
                    }
                    shop.save();
                    res.json({
                        error: false,
                        message: 'Data Saved Successfully'
                    });
                } else {
                    res.status(500).json({
                        error: true,
                        message: 'No shop found'
                    });
                }
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