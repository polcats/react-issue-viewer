import { observable, computed } from 'mobx';
import { LabelApiProps } from '../components/Label';
import { projectId, gitlabAPI } from '../GitlabAPI';
import { model, Model, modelFlow, prop, _async, _await } from 'mobx-keystone';

// @model('issueViewer/IssuesModel')
// class IssuesModel extends Model({

// }) {}
