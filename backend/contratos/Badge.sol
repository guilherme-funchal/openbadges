// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Badges is ERC721, Ownable {

    struct Issuer {
        uint256 id;
        string entityId;
        string name;
        string description;
        string createdAt;
        string createdBy;
        string image;
        string staffId;
        string email;
        string url;
        string domain;
    }

    struct BadgeClass {
        uint256 id;
        string entityId;
        string createdAt;
        string createdBy;
        string issuerId;
        string name;
        string image;
        string description;
        string criteriaUrl;
        string criteriaNarrative;
        string alignmentsTargetName;
        string alignmentsTargetUrl;
        string alignmentsTargetDescription;
        string alignmentsTargetFramework;
        string alignmentsTargetCode;
        string tags;
        string expiresAmount;
        string expiresDuration;
    }

    struct Assertion {
        uint256 id;
        string entityId;
        string createdAt;
        string image;
        string issuerId;
        string badgeclassId;
        string recipientId;
        string issuedOn;
        bool revoked;
        string revocationReason;
        string expires;
    }

    mapping(uint => Issuer) private issuers;
    uint256[] private issuerIds;
    mapping(uint => BadgeClass) private badgeclasses;
    uint256[] private badgeClassIds;
    mapping(uint => Assertion) private assertions;
    uint256[] private assertionIds;
    uint256 private badgeclassId = 0;
    uint256 private assertionId = 0;
    uint256 private issuerId  = 0;

    constructor() ERC721("Badges", "BDG") {}

    function setIssuer(
        string memory _entityId,
        string memory _name,
        string memory _description,
        string memory _createdAt,
        string memory _createdBy,
        string memory _image,
        string memory _staffId,
        string memory _email,
        string memory _url,
        string memory _domain
        ) public { 
        issuerId++;
        Issuer memory newIssuer = Issuer({
            id: issuerId,
            entityId : _entityId,
            name: _name,
            description: _description,
            createdAt : _createdAt,
            createdBy : _createdBy,
            image : _image,
            staffId: _staffId,
            email : _email,
            url : _url,
            domain : _domain
        });
        issuerIds.push(newIssuer.id);
        issuers[newIssuer.id] = newIssuer; 
         
    }

    function setBadgeClass(
        string memory _entityId,
        string memory _createdAt,
        string memory _createdBy,
        string memory _issuerId,
        string memory _name,
        string memory _image,
        string memory _description,
        string memory _criteriaUrl,
        string memory _criteriaNarrative,
        string memory _alignmentsTargetName,
        string memory _alignmentsTargetUrl,
        string memory _alignmentsTargetDescription,
        string memory _alignmentsTargetFramework,
        string memory _alignmentsTargetCode,
        string memory _tags,
        string memory _expiresAmount,
        string memory _expiresDuration
    ) public {
        badgeclassId++; 
        BadgeClass memory newBadgeClass = BadgeClass({
        id: badgeclassId,   
        entityId : _entityId,
        createdAt : _createdAt,
        createdBy : _createdBy,
        issuerId : _issuerId,
        name : _name,
        image : _image,
        description : _description,
        criteriaUrl : _criteriaUrl,
        criteriaNarrative : _criteriaNarrative,
        alignmentsTargetName : _alignmentsTargetName,
        alignmentsTargetUrl : _alignmentsTargetUrl,
        alignmentsTargetDescription : _alignmentsTargetDescription,
        alignmentsTargetFramework: _alignmentsTargetFramework,
        alignmentsTargetCode : _alignmentsTargetCode,
        tags : _tags,
        expiresAmount : _expiresAmount,
        expiresDuration : _expiresDuration
        });
        badgeClassIds.push(newBadgeClass.id);
        badgeclasses[newBadgeClass.id] = newBadgeClass; 
    }


    function setAssertion(
        string memory _entityId,
        string memory _createdAt,
        string memory _image,
        string memory _issuerId,
        string memory _badgeclassId,
        string memory _recipientId,
        string memory _issuedOn,
        bool _revoked,
        string memory _revocationReason,
        string memory _expires

    ) public {
        assertionId++; 

        Assertion memory newAssertion = Assertion({
            id : assertionId,
            entityId : _entityId,
            createdAt : _createdAt,
            image : _image,
            issuerId : _issuerId,
            badgeclassId : _badgeclassId,
            recipientId : _recipientId,
            issuedOn : _issuedOn,
            revoked :_revoked,
            revocationReason : _revocationReason,
            expires : _expires
        });

        assertionIds.push(newAssertion.id);
        assertions[newAssertion.id] = newAssertion; 
    }

    function updateIssuer(
            uint256 id,
            string memory _name,
            string memory _description,
            string memory _image,
            string memory _staffId,
            string memory _email,
            string memory _url,
            string memory _domain
    ) public
    {
            Issuer storage targetIssuer = issuers[id];
            targetIssuer.name = _name;
            targetIssuer.description = _description;
            targetIssuer.image = _image;      
            targetIssuer.staffId = _staffId;
            targetIssuer.email = _email;
            targetIssuer.url = _url;
            targetIssuer.domain = _domain;
    }

    function updateBadgeClass(
            uint256 id,
            string memory _name,
            string memory _description,
            string memory _criteriaUrl,
            string memory _criteriaNarrative,
            string memory _alignmentsTargetName,
            string memory _alignmentsTargetUrl,
            string memory _alignmentsTargetDescription,
            string memory _alignmentsTargetFramework,
            string memory _alignmentsTargetCode,
            string memory _tags,
            string memory _expiresAmount,
            string memory _expiresDuration
           
    ) public
    {
            BadgeClass storage targetBadgeClass = badgeclasses[id];

            targetBadgeClass.name = _name;
            targetBadgeClass.description = _description;
            targetBadgeClass.criteriaUrl = _criteriaUrl;
            targetBadgeClass.criteriaNarrative = _criteriaNarrative;
            targetBadgeClass.alignmentsTargetName = _alignmentsTargetName;
            targetBadgeClass.alignmentsTargetUrl = _alignmentsTargetUrl;
            targetBadgeClass.alignmentsTargetDescription = _alignmentsTargetDescription;
            targetBadgeClass.alignmentsTargetFramework = _alignmentsTargetFramework;
            targetBadgeClass.alignmentsTargetCode = _alignmentsTargetCode;
            targetBadgeClass.tags = _tags;
            targetBadgeClass.expiresAmount = _expiresAmount;
            targetBadgeClass.expiresDuration = _expiresDuration;
    }

    function revokeAssertion(
        uint256 id,
        bool _revoked,
        string memory _revocationReason
    ) public
    {
            Assertion storage targetAssertion = assertions[id];
            targetAssertion.revoked = _revoked;
            targetAssertion.revocationReason = _revocationReason;        
    }
    
    function deleteIssuer(uint256 id) public {
        delete issuers[id];
    }

    function deleteBadgeClass(uint256 id) public {
        delete badgeclasses[id];
    }

    function deleteAssertions(uint256 id) public {
        delete assertions[id];
    }

    function getIssuerByID(uint256 id)  public view returns(
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
    )
    {
        Issuer memory issuer = issuers[id];

        return(
            issuer.id,
            issuer.entityId,
            issuer.name,
            issuer.description,
            issuer.createdAt,
            issuer.createdBy,
            issuer.image,
            issuer.staffId,
            issuer.email,
            issuer.url,
            issuer.domain
        );
    }

    function getAssertionByID(uint256 id)  public view returns(
            uint256,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            bool,
            string memory,
            string memory

    )
    {
        Assertion memory assertion = assertions[id];

        return(
            assertion.id,
            assertion.entityId,
            assertion.createdAt,
            assertion.image,
            assertion.issuerId,
            assertion.badgeclassId,
            assertion.recipientId,
            assertion.issuedOn,
            assertion.revoked,
            assertion.revocationReason,
            assertion.expires
        );
    }

     function getBadgeClassByID(uint256 id)  public view returns(
            uint256 _id,
            string memory _entityId,
            string memory _createdAt,
            string memory _createdBy,
            string memory _issuerId,
            string memory _name,
            string memory _image,
            string memory _description,
            string memory _criteriaUrl,
            string memory _criteriaNarrative,
            string memory _alignmentsTargetName,
            string memory _alignmentsTargetUrl,
            string memory _alignmentsTargetDescription,
            string memory _alignmentsTargetFramework,
            string memory _alignmentsTargetCode,
            string memory _tags,
            string memory _expiresAmount,
            string memory _expiresDuration

    )
    {
        BadgeClass memory badgeclass = badgeclasses[id];

        return(
            badgeclass.id,
            badgeclass.entityId,
            badgeclass.createdAt,
            badgeclass.createdBy,
            badgeclass.issuerId,
            badgeclass.name,
            badgeclass.image,
            badgeclass.description,
            badgeclass.criteriaUrl,
            badgeclass.criteriaNarrative,
            badgeclass.alignmentsTargetName,
            badgeclass.alignmentsTargetUrl,
            badgeclass.alignmentsTargetDescription,
            badgeclass.alignmentsTargetFramework,
            badgeclass.alignmentsTargetCode,
            badgeclass.tags,
            badgeclass.expiresAmount,
            badgeclass.expiresDuration
        );
    }

    function getItemsIssuer() public view returns (Issuer[] memory){
        uint total_ids = issuerIds.length + 1;

        Issuer[] memory irs = new Issuer[](total_ids);
        for(uint i=0;i<total_ids;i++){
            irs[i] = issuers[i];
        }
        return irs;
    }

    function getItemsBadgeClass() public view returns (BadgeClass[] memory){
        uint total_ids = badgeClassIds.length + 1;

        BadgeClass[] memory irs = new BadgeClass[](total_ids);
        for(uint i=0;i<total_ids;i++){
            irs[i] = badgeclasses[i];
        }
        return irs;
    }


    function getItemsAssertion() public view returns (Assertion[] memory){
        uint total_ids = assertionIds.length + 1;

        Assertion[] memory irs = new Assertion[](total_ids);
        for(uint i=0;i<total_ids;i++){
            irs[i] = assertions[i];
        }
        return irs;
    }
}