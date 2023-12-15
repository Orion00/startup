import React from 'react';
import './campaignLog.css';

export function CampaignLog({userId, campaignData, onCampaignDataChange}) {

    const updateCampaign = () => {
        const updatedData = "words to replace";
        onCampaignDataChange(updatedData);
      };

    return (
        <main className="container-fluid bg-secondary hovcur">
    <div className="container bg-light align-items-center">
          <div className="row">
            <div className="col-sm text-center">
              <h1>Campaign Log</h1>
            </div>
          </div>

      <div className="row">
        <div className="col-lg text-center">
          <div className="form-group">
            <select id="campaignSelector" className="form-select col-md" aria-label="Campaign selector">
            </select>
            <textarea className="form-control" id="campaignnotes" rows="3"></textarea>
        </div>
          <button type="submit" className="btn btn-success save" onClick={updateCampaign}>Save</button>
          <button type="submit" className="btn btn-danger clear">Clear</button>
          <button type="submit" className="btn btn-dark add" data-bs-toggle="modal" data-bs-target="#addModal">Add campaign</button>
          {/* onclick="removeCampaign() */}
          <button type="submit" className="btn btn-secondary remove">Remove campaign</button>

        <div className="modal fade" id="addModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="campaignModalLabel">New campaign log</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <select id="campaignModal" className="form-select col-md" aria-label="Campaign selector">
                      <option value="Zealot">Night of the Zealot</option>
                      <option value="Dunwich">The Dunwich Legacy </option>
                      <option value="Carcosa">The Path to Carcosa</option>
                      <option value="Forgotten">The Forgotten Age</option>
                      <option value="Circle">The Circle Undone</option>
                      <option value="Dream">The Dream Eaters</option>
                      <option value="Innsmouth">The Innsmouth Conspiracy</option>
                      <option value="Edge">Edge of the Earth</option>
                      <option value="Scarlet">Scarlet Keys</option>
                      <option value="Custom">Custom</option>
                  </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="investigatorInput" className="col-form-label">Investigator</label>
                    <input type="text" className="form-control" id="investigatorInput"/>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                {/* onclick="addCampaign()" */}
                <button type="button" className="btn btn-success" data-bs-dismiss="modal">Add campaign</button>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
      <br />
  </div>

</main>
    )
}