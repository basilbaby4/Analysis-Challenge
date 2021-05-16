exports.createdUser = (shopId = '', invitationResponse) => {
    return new Promise(function (resolve, reject) {
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
            resolve({
                error: false,
                message: 'Data Saved Successfully'
            })
        } else {
            reject({
                error: true,
                message: 'No shop found'
            });
        }
    })
}