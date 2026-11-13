# Mapa de linhas do código (gerado por ferramentas/mapa.mjs, não edite à mão)

Gerado em 13/11/2026, 14:44:42. Procure aqui com Grep e leia só as linhas indicadas.
Formato: `linha: nome`. O guia por assunto está em GUIA-CODIGO.md.

## index.html (13596 linhas)

16: <!-- Tailwind CSS compilado (sem observador em tempo real para toque instantâneo) -->
18: <!-- Font Awesome Icons -->
20: <!-- PDF.js para renderizar PDFs -->
22: <!-- pdf-lib para gerar contratos em A4 profissional -->
24: <!-- Gera o QR code do Pix a partir do copia e cola -->
26: <!-- Supabase (banco de dados online) -->
142: <!-- Sistema de design do MOTORA: cores, tipografia e componentes -->
147: <!-- Header Principal -->
161: <!-- Controles do Header -->
163: <!-- Botão Status Online/Offline (Motorista) -->
171: <!-- Ativar Notificações -->
176: <!-- Temas -->
181: <!-- Logout Button -->
190: <!-- Conteúdo Principal -->
193: <!-- TELA DE LOGIN -->
194: #secLogin
227: <!-- ESCOLHA DA DEMONSTRAÇÃO (login teste / teste) -->
228: #secDemoEscolha
243: <!-- TELA PÚBLICA DE ASSINATURA OFICIAL VIA GOV.BR (?assinar=token) -->
244: #secGovBrInvite
258: <!-- PAINEL DO MOTORISTA -->
259: #secDriverPanel
261: <!-- Card do Veículo Vinculado -->
275: <!-- Renderizado via JS: Status "Em dia" ou "Em atraso" -->
285: <!-- Botão "Instalar app" (só aparece em celular Android, fora do próprio app) -->
290: <!-- Aviso: nova versão do app Android -->
293: <!-- Aviso vermelho: notificações desligadas -->
296: <!-- Aviso vermelho: CNH vencida (com botão para enviar a nova) -->
300: <!-- Aviso de Pix / pagamento pendente -->
303: <!-- Navegação de Abas -->
321: <!-- Conteúdo das Abas Motorista -->
324: <!-- Aba CRLV-e -->
325: #tabDrvCrlv
330: <!-- Renderizado dinamicamente -->
334: <!-- Aba Contrato -->
335: #tabDrvContract
345: <!-- Renderizado dinamicamente -->
349: <!-- Aba Vistoria -->
350: #tabDrvInspection
357: <!-- Aba Pagamento -->
358: #tabDrvPayment
371: <!-- Caução e multas do motorista -->
373: <!-- Valor e descrição da cobrança -->
383: <!-- Seção Pix -->
397: <!-- QR Code Renderizado aqui -->
430: <!-- Seção Upload de Comprovante -->
447: <!-- Lista de comprovantes -->
452: <!-- Recibos quando o contrato está encerrado -->
459: <!-- PAINEL MASTER (ADMINISTRAÇÃO) -->
460: #secMasterPanel
500: <!-- Aviso: falta criar a tabela dos termos no banco -->
503: <!-- SUB-ABA: GESTÃO DE VEÍCULOS -->
505: <!-- Lista de Veículos -->
521: <!-- Renderizado via JS -->
528: <!-- Form de Adicionar Veículo -->
575: <!-- SUB-ABA: CONTRATOS DE LOCAÇÃO E VISTORIAS -->
675: <!-- SUB-ABA: GESTÃO DE MOTORISTAS -->
681: <!-- Lista de Motoristas (sem moldura: os cartões já são a moldura) -->
686: <!-- Cartões dos motoristas: renderizados em renderMasterPanel (cartão curto + "Mais ações") -->
691: <!-- Fichas Arquivadas (após marcar caução pago) -->
700: <!-- Form de Adicionar Motorista -->
795: <!-- Barra de baixo do dono (só no design novo) -->
806: <!-- MODAL PRIMEIRO LOGIN -->
807: #modalFirstLogin
841: <!-- MODAL OBRIGATÓRIO: ATIVAR NOTIFICAÇÕES (MOTORISTA) -->
842: #modalNotif
855: <!-- MODAL VISTORIA (MASTER) -->
856: #modalInspection
869: <!-- MODAL CONFIGURAÇÕES (MASTER) -->
870: #modalSettings
1003: <!-- MODAL TEMAS -->
1004: #modalThemes
1015: <!-- MODAL DADOS DE ACESSO DO MOTORISTA NOVO -->
1016: #modalCreds
1031: <!-- JANELA DE CONFIRMAÇÃO DO APP (substitui confirm/prompt do navegador; ver uiDialogo) -->
1046: <!-- MODAL FICHA DO MOTORISTA (MASTER) -->
1047: #modalDriverFile
1089: <!-- CONTRATO DE LOCAÇÃO (rental_contracts + ações) -->
1093: <!-- ENCERRAMENTO DE CONTRATO (profiles.pix_extra.contrato_encerrado) -->
1122: <!-- CAUÇÃO do motorista (guardada em profiles.pix_extra.caucao) -->
1137: <!-- MULTAS E OUTRAS DESPESAS a pagar pelo motorista (profiles.pix_extra.multas) -->
1179: <!-- MODAL CONTROLE FINANCEIRO (MASTER) -->
1180: <!-- RECIBO DE PAGAMENTO (MASTER -> motorista pelo WhatsApp) -->
1181: #modalRecibo
1200: <!-- ÁREA DO PIX (MASTER): escolhe o motorista e envia, edita ou exclui o Pix -->
1201: #modalPixArea
1217: <!-- ÁREA IA (MASTER): mensagens de WhatsApp prontas para cada aviso enviado ao motorista -->
1218: #modalIA
1300: <!-- MEUS RECIBOS (motorista): todos os recibos pagos, cada um em PDF -->
1301: <!-- TROCAR MINHA SENHA (motorista e dono) -->
1302: #modalEditVeh
1339: #modalSenha
1361: #modalMeusRecibos
1379: <!-- E-MAIL: a IA escreve, o dono confere e só então envia (sai pela conta Google do dono) -->
1380: #modalEmail
1400: <!-- RELATÓRIO DO FINANCEIRO (segue o período e os filtros escolhidos) -->
1401: #modalReport
1416: #modalFinCardDetail
1429: #modalFinance
1462: <!-- FILTROS -->
1512: <!-- DESPESAS DO APLICATIVO (gasolina, alimentação...) -->
1532: <!-- MODAL DESPESAS DO VEÍCULO (MASTER) -->
1533: #modalExpenses
1568: <!-- MODAL NOVO PIX -->
1569: #modalNewPix
1621: <!-- VALORES DA COBRANÇA: aluguel do carro (automático) + acréscimo − desconto -->
1679: <!-- CORRIGIR RECIBO: muda só o texto e o período; valor e comprovante não mudam -->
1680: #modalCorrigirRecibo
1694: <!-- MODAL WIZARD DE CONTRATO DE LOCAÇÃO -->
1695: #modalContractWizard
1711: <!-- Seleção Motorista & Veículo -->
1723: <!-- Locador -->
1744: <!-- Locatário -->
1765: <!-- Veículo -->
1788: <!-- Configuração Comercial -->
1864: <!-- Anexo I: Termo de Vistoria e Entrega Integrado -->
1932: <!-- Cláusulas editáveis -->
1944: <!-- Prévia -->
1958: <!-- MODAL DETALHE, ASSINATURAS E HISTÓRICO DO CONTRATO -->
1959: #modalContractDetail
1972: <!-- MODAL GERADOR DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO) -->
1973: #modalInspectionTerm
2034: <!-- Fotos da vistoria (lote + reuso + análise IA + confirmação obrigatória de avarias) -->
2057: <!-- Resumo de Avarias Confirmadas + Checklist Bilateral + Ressalvas -->
2097: <!-- MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA -->
2098: #modalInspectionTermDetail
2111: <!-- MODAL CONFIRMAÇÃO DE DANO DETECTADO PELA IA (OBRIGATÓRIO ANTES DE NOMEAR) -->
2112: #modalInspDamageConfirm
2127: <!-- MODAL VISUALIZADOR DE DOCUMENTOS/COMPROVANTES -->
2128: #modalDocViewer
2136: #modalDocBody
2137: <!-- Conteúdo pré-visualizado -->
2143: #modalTerms
2157: <!-- NOTIFICAÇÕES TOAST -->
2174: lsGet()
2175: lsSet()
2176: lsDel()
2199: demoLoginRole()
2203: demoId()
2204: demoSave()
2205: demoSaved()
2207: *datas no horário de Brasília*
2208: demoLocal()
2209: demoParts()
2210: demoDay()
2211: demoNextDue()
2216: *dados fictícios (4 meses)*
2217: demoBuild()
2450: *documentos fictícios (imagem gerada na hora)*
2451: *documentos e fotos fictícios (desenhados na hora; campos com AAAA/0000 e tarja "NÃO É REAL")*
2452: demoDocBlob()
2530: *"banco de dados" na memória, com a mesma forma de uso do Supabase*
2531: demoQuery()
2554: out()
2560: run()
2601: demoOnUpdate()
2611: demoOnInsert()
2723: demoClient()
2926: demoStart()
2934: demoStop()
2940: abrirDemo()
2947: trocarDemo()
2952: demoBanner()
2967: toEmail()
2971: showLogin()
2975: esc()
2980: dataHoraBR()
2988: uiDialogo()
3036: uiConfirm()
3045: uiPrompt()
3051: friendlyError()
3061: devicePrefs()
3064: saveDevicePrefs()
3067: docRef()
3068: viewDocIdx()
3070: setBusy()
3113: **TEMAS**
3122: currentTheme()
3127: applyTheme()
3128: openThemes()
3138: pickTheme()
3144: toggleDarkMode()
3146: **DESIGN NOVO / ANTIGO (escolhido pelo dono; o dos motoristas fica no banco e vale para todos)**
3148: loadDesignCfg()
3155: applyDesign()
3172: markMasterNav()
3179: fillDesignCfg()
3184: saveDesign()
3198: showToast()
3207: **TROCAR MINHA SENHA (o motorista troca a senha padrão por uma só dele)**
3208: senhaErro()
3209: abrirSenha()
3218: salvarIaCodigo()
3228: fecharSenha()
3229: salvarSenha()
3250: loginUserInput()
3255: loginErro()
3259: verSenha()
3264: handleLogin()
3313: logout()
3332: saveFirstLoginPreferences()
3355: carregarDados()
3387: aplicarDados()
3428: loadAndRender()
3455: autoRefresh()
3494: markUpdated()
3499: reload()
3504: renderApp()
3552: **MASTER ENTRA NA CONTA REAL DO MOTORISTA (sem a senha dele)**
3555: masterBack()
3557: viewAsDriver()
3579: exitViewAs()
3598: viewOnly()
3599: renderViewAsBanner()
3609: showSection()
3614: withBtn()
3622: toggleDriverStatus()
3631: isOnline()
3633: updateStatusToggleUI()
3646: **BOTÃO "INSTALAR APP" (APK) — só Android; iPhone/iPad e o próprio app não veem**
3655: checkApkUpdate()
3670: updateInstallApkButton()
3690: renderDriverPanel()
3948: switchDriverTab()
3963: **CHAVE PIX (guardada no campo pix_link como "chave:tipo|valor")**
3966: parsePixKey()
3970: normalizePixKey()
3978: pixKeyLooksOk()
3986: togglePixKeyFields()
3992: updatePixKeyPlaceholder()
3998: copyPixKey()
4005: copyPixCode()
4017: receiptBadge()
4027: receiptMasterBox()
4054: receiptAction()
4061: confirmReceipt()
4090: rejectReceipt()
4102: recheckReceipt()
4111: uploadReceipt()
4134: switchMasterTab()
4153: maskPhone()
4162: waLink()
4167: allVeh()
4168: allDrv()
4169: chargeVehicleId()
4181: enviarPedidoParcialAsaas()
4197: pedirPixParcial()
4215: restaurarPixTotal()
4221: responderPixParcial()
4245: contrato30Info()
4275: encerrarContrato()
4292: encerrarContratoPrompt()
4305: reativarContrato()
4329: marcarCaucaoPagoArquivar()
4350: desarquivarFicha()
4368: deliveryInspectionHtml()
4407: uploadDeliveryPhotos()
4434: delDeliveryPhoto()
4452: addCauDesconto()
4477: puxarMultaCaucao()
4498: delCauDesconto()
4520: dfCauDescontosHtml()
4553: dfContratoRender()
4597: encerrarContratoConfirmFicha()
4604: renderMasterPanel()
4768: renderArchivedDrivers()
4813: handleAddVehicle()
4853: deleteVehicle()
4854: cancelDeleteVehicle()
4856: confirmDeleteVehicle()
4880: abrirEditarVeiculo()
4902: evReadStoredCrlv()
4927: evReadChosenCrlv()
4943: fecharEditarVeiculo()
4944: salvarEditarVeiculo()
4981: drvCauMostra()
4988: drvCauLer()
4996: handleAddDriver()
5074: marcarSituacao()
5084: updateDriverPaymentStatus()
5093: deleteDriver()
5094: cancelDeleteDriver()
5096: confirmDeleteDriver()
5118: isImageFile()
5120: prepareFile()
5142: uploadFile()
5153: fileUrl()
5164: downloadName()
5168: renderFilePreview()
5188: renderPdfToCanvas()
5215: viewDoc()
5236: **DINHEIRO**
5237: parseMoney()
5244: fmtMoney()
5245: fmtDate()
5246: todayISO()
5248: **CONFIGURAÇÕES (Gemini e Google Drive)**
5250: loadConfigStatus()
5255: paintConfig()
5260: fillOwnerVehicleSelect()
5266: saveOwnerVehicle()
5288: locadorMerged()
5301: getLocadoresList()
5321: locadorForVehicle()
5330: fillLocadorSettings()
5350: cfgOnLocadorChange()
5351: upsertLocadorInList()
5381: deleteLocadorSetting()
5397: saveLocadorSettings()
5425: openSettings()
5440: closeSettings()
5441: saveConfig()
5451: **ASAAS (Financeiro: chave por motorista ativo + Config: conta API)**
5452: renderAsaasDrivers()
5479: toggleDriverAsaas()
5511: getAtrasoCfg()
5515: fillAtrasoCfg()
5522: saveAtrasoCfg()
5539: atrasoDataBR()
5544: atrasoPrazoUtil()
5551: calcEncargosAtraso()
5570: ehLinhaEncargo()
5571: calcAtrasoMotorista()
5601: atualizarPixAtraso()
5614: loadAsaasInfo()
5628: saveAsaas()
5636: testarAsaas()
5643: copiarAsaas()
5647: testDrive()
5654: resyncDrive()
5662: **FICHA DO MOTORISTA**
5665: openDriverFile()
5697: closeDriverFile()
5699: saveDriverFile()
5764: aiFillDriver()
5803: **CONTROLE FINANCEIRO**
5804: finRange()
5821: dayBR()
5822: inRange()
5824: onFinPeriodChange()
5830: fillFinFilters()
5838: clearFinFilters()
5842: updateFinFilterCount()
5851: openFinance()
5857: switchFinTab()
5868: finCardBtn()
5876: closeFinCardDetail()
5877: closeFinance()
5879: collectRentFinData()
5930: renderFinance()
5988: openFinCardDetail()
6195: openFinExtrato()
6289: renderFinExtratoView()
6370: openFinExtratoReport()
6387: renderFinGrafico()
6407: **E-MAIL (a IA escreve, o dono confere e confirma; sai pela conta Google do dono)**
6409: okEmail()
6411: openEmailCompose()
6432: closeEmailCompose()
6433: sendEmailCompose()
6448: emailRecibo()
6453: emailIA()
6461: **RELATÓRIO DO FINANCEIRO**
6463: finFiltersText()
6468: finPeriodText()
6475: buildReportHtml()
6497: openFinReport()
6507: closeFinReport()
6508: printFinReport()
6512: shareFinReport()
6522: emailFinReport()
6528: **DESPESAS DO VEÍCULO**
6530: openExpenses()
6542: closeExpenses()
6543: fillExpenseTypes()
6548: createExpenseType()
6563: aiReadExpense()
6595: renderExpenses()
6617: saveExpense()
6644: deleteExpense()
6673: inspSlotLabel()
6676: normalizeInspDbSlot()
6679: photoDamageBadge()
6688: buildVehicleInspectionReport()
6725: copyVehicleInspectionText()
6733: photoCard()
6775: inspectionHtml()
6855: hydrateImages()
6861: openInspection()
6869: closeInspection()
6873: renderInspectionModal()
6880: uploadInspection()
6937: deleteInspectionPhoto()
6957: fmtDue()
6963: nextDueLocal()
6974: openNewPix()
7004: **CAUÇÃO DO MOTORISTA**
7005: cauOf()
7006: **DEVOLUÇÃO DO VEÍCULO: aviso com 15 dias, no máximo 2 aluguéis depois do aviso; caução e multas não são mais cobradas**
7007: devOf()
7008: devCobrancas()
7010: devPrevisao()
7018: dfDevRender()
7045: dfDevIr()
7046: dfDevSalvar()
7051: dfDevAvisar()
7057: dfDevDesfazer()
7061: dfDevReceber()
7070: **CAUÇÃO: parcela mínima de R$ 100; o que sobra vai para a última (12/11/2026, pedido do dono)**
7074: cauPlano()
7082: cauParcela()
7089: cauParcelasTexto()
7093: cauNext()
7100: dfCauFill()
7110: dfCauCalc()
7138: dfCauRead()
7151: expTypeName()
7155: driverFinVehicleId()
7167: cauEntradaItem()
7181: cauPagoDespesaItem()
7196: **CAUÇÃO: quanto já foi pago**
7198: cauStatus()
7208: obsResumoHtml()
7209: cauResumoHtml()
7214: **MULTAS E OUTRAS DESPESAS**
7215: multasOf()
7217: multaPagaAuto()
7222: multasAbertas()
7223: multasPendentes()
7224: multasResumoHtml()
7232: cobOf()
7233: dfCobFill()
7239: dfCobRead()
7242: dfCobInfo()
7252: cobResumoHtml()
7256: ajustesOf()
7260: ajusteVale()
7261: isoDia()
7263: vencProxima()
7264: previsaoProxima()
7278: previsaoHtml()
7282: dfAjRender()
7288: addAjuste()
7297: delAjuste()
7302: abrirAjustes()
7303: renderProxCobrancas()
7309: savePixExtra()
7317: dfMultFill()
7325: fdPaga()
7326: dfMultRender()
7335: toggleMultas()
7342: addMulta()
7352: delMulta()
7360: multaPaga()
7369: renderDriverExtras()
7397: mondayAfter()
7405: renderDriverProfileExtras()
7471: semanaDoPix()
7477: **MEUS RECIBOS (área do motorista)**
7479: meusRecibosLista()
7483: reciboRowHtml()
7491: renderEncerradoRecibos()
7496: openMeuReciboDireto()
7497: openMeusRecibos()
7504: closeMeusRecibos()
7505: reciboPdfHtml()
7516: verMeuRecibo()
7523: voltarMeusRecibos()
7524: pdfMeuRecibo()
7528: shareMeuRecibo()
7537: **VALORES DA COBRANÇA: aluguel do carro + acréscimo − desconto**
7538: editVehicleRent()
7555: nextParcel()
7561: fillNewPixValues()
7597: newPixParts()
7628: **PERÍODO E VENCIMENTO DA COBRANÇA**
7629: dataISO()
7630: dataDe()
7631: dataMais()
7632: dataBR()
7633: diasEntre()
7634: isoSP()
7635: pixPeriodo()
7642: pixDesc()
7643: pixDiasPeriodo()
7648: marcarAjustesPorVenc()
7653: pixDatasNovo()
7662: pixDatasMudou()
7673: pixAluguelProporcional()
7681: pixPeriodoInfo()
7694: pixAddLinha()
7701: pixLinhas()
7703: descSoma()
7713: calcNewPix()
7722: **RECIBO DE PAGAMENTO**
7726: receiptValue()
7727: **COBRAR ATRASO: a IA escreve a mensagem de cobrança e abre na Área IA, pronta para enviar no WhatsApp**
7728: atrasoDados()
7732: cobrarAtraso()
7749: allocatePix()
7768: reciboData()
7791: fmtDateTimeBR()
7792: reciboTexto()
7843: openRecibo()
7860: closeRecibo()
7861: **CORRIGIR RECIBO**
7863: corrigirLinhaHtml()
7873: openCorrigirRecibo()
7896: closeCorrigirRecibo()
7897: corrigirLer()
7903: corrigirSoma()
7910: salvarCorrigirRecibo()
7927: copyRecibo()
7932: reciboCanvas()
7949: reciboPdfBlob()
7967: shareReciboPdf()
7983: rotularTabelas()
8001: areaAberta()
8002: markAreas()
8012: closeAreas()
8016: toggleArea()
8024: dobraSalva()
8025: setDobra()
8030: toggleDobra()
8037: dobraTopo()
8044: renderMasterResumo()
8058: renderMasterTopo()
8080: loadIA()
8102: updateIABadge()
8107: loadIASetting()
8113: paintIASwitch()
8119: toggleIA()
8126: loadRobo()
8135: iaPrepararQr()
8140: paintRobo()
8169: pedirCodigoRobo()
8178: toggleRobo()
8193: iaTodosGerar()
8211: iaTodosCancelar()
8215: iaTodosConfirmar()
8229: loadIARules()
8234: iaAbrirPdf()
8240: renderIARules()
8244: saveIARules()
8249: addIARule()
8254: delIARule()
8258: openIA()
8273: closeIA()
8274: iaShow()
8275: iaPhone()
8280: renderIA()
8322: iaAprovar()
8331: iaPhone2()
8332: iaSend()
8363: iaMark()
8374: iaDelete()
8385: openPixArea()
8394: closePixArea()
8395: renderPixArea()
8439: openEditPix()
8468: deletePix()
8480: closeNewPix()
8482: saveNewPix()
8573: pushSupported()
8574: isIOS()
8575: isStandalone()
8576: b64ToBytes()
8582: **NOTIFICAÇÕES OBRIGATÓRIAS PARA O MOTORISTA**
8587: notifStatus()
8595: stepsList()
8599: notifHelpHtml()
8633: renderNotifModal()
8645: checkDriverNotifications()
8678: activateFromModal()
8691: refreshNotifButton()
8710: subscribePush()
8725: enableNotifications()
8745: closeDocViewer()
8753: **FUNÇÕES DO MOTORISTA (o master liga e desliga em Configurações)**
8765: allFeaturesOn()
8766: feat()
8767: loadDriverFeatures()
8774: saveDriverFeatures()
8779: drawFeatureToggles()
8794: setAllFeatures()
8805: applyDriverFeatures()
8820: **PIX: conferência do código e QR code desenhado no aparelho**
8821: crc16()
8829: **PIX COPIA E COLA GERADO NO APARELHO (padrão BR Code do Banco Central, sem API de banco)**
8831: pixTxt()
8832: pixCampo()
8833: pixGerarCodigo()
8843: pixAutoLigado()
8844: pixAutoMudou()
8849: gerarPixAuto()
8865: pixRecebedorCarregar()
8876: pixRecebedorGuardar()
8883: pixValid()
8889: renderPixQr()
8899: previewNewPixQr()
8909: **FOTO DO MOTORISTA (recortada da CNH)**
8910: photoPath()
8911: fileToCanvas()
8930: cropPhoto()
8944: savePhoto()
8949: photoBoxFrom()
8955: fillAvatar()
8966: fillAvatars()
8979: storedFile()
8986: photoFromCnh()
8998: **FOTO DO PERFIL ACOMPANHA A CNH**
9001: cnhStamp()
9002: photoFiles()
9010: avatarPath()
9015: syncCnhPhotos()
9039: pickImage()
9042: changeDriverPhoto()
9058: **LEITURA AUTOMÁTICA DE DOCUMENTOS (IA)**
9060: uploadTmp()
9067: clearTmp()
9072: aiReadFiles()
9078: okDateISO()
9080: noAccents()
9082: makeUsername()
9091: titleCase()
9092: syncNewDriverAccess()
9098: setNewDriverPhoto()
9103: pickNewDriverPhoto()
9107: resetNewDriverForm()
9115: newDriverDocChosen()
9149: anoCrlv()
9153: formatVehicleBrand()
9158: inferVehicleBrand()
9167: normalizeCrlvFields()
9186: applyCrlvFields()
9199: aiReadCrlv()
9213: **E-MAIL E TELA COM USUÁRIO E SENHA DO MOTORISTA NOVO**
9214: sendWelcomeEmail()
9220: showCredentials()
9231: demoAssistente()
9250: **PERGUNTAR À IA (ÁREA IA, só o master)**
9254: iaChatReset()
9255: iaNorm()
9256: iaAcha()
9262: iaVeicTxt()
9263: iaCamposVeic()
9264: iaDataOk()
9265: iaOpcoes()
9266: iaTodosMotoristas()
9270: iaFerramenta()
9365: renderIAChat()
9382: iaChatDica()
9383: iaChatEnviar()
9418: iaChatNota()
9419: iaCancelarCartao()
9420: iaConfirmarCartao()
9465: **GANHOS APLICATIVO (Uber/99/inDrive) – só o master**
9466: syncAppFinState()
9475: renderAppEarnings()
9555: saveAppEarning()
9582: workDayISO()
9583: paintDayOff()
9592: renderDayOff()
9599: setDayOff()
9609: aiReadEarning()
9642: **DESPESAS DO APLICATIVO**
9644: appExpCustomTypes()
9645: fillAppExpTypes()
9652: onAppExpTypeChange()
9657: saveAppExpense()
9682: deleteAppExpense()
9691: deleteAppEarning()
9788: loadTermsAcceptances()
9800: termsOf()
9801: currentAcceptance()
9802: needsTermsAcceptance()
9805: fmtDateTime()
9808: termsPlainText()
9812: termsHash()
9820: openTermsGate()
9843: termsGateCheck()
9851: acceptTerms()
9871: acceptanceHtml()
9882: openTermsViewer()
9900: closeTerms()
9906: downloadTermsCopy()
9927: termsBadgeMaster()
9934: termsMasterDetail()
9975: renderTermsSetupBanner()
9988: copyTermsSql()
9998: cnhExpired()
9999: cnhWaiting()
10000: onlyDigits()
10001: normName()
10003: verifyCnh()
10015: renderCnhBanner()
10033: sendNewCnh()
10081: cnhBadgeMaster()
10089: applyPendingCnh()
10097: autoReadNewCnhs()
10115: cnhPendingHtml()
10129: recheckPendingCnh()
10139: rejectPendingCnh()
10149: showContractDoc()
10267: inspectPdfSignaturesBytes()
10286: readPdfFileAsBase64AndInspect()
10301: govBrSignersList()
10313: renderGovBrFlowBox()
10365: driverGovBrBlockHtml()
10394: govBrPublicAppBaseUrl()
10398: createGovBrInvite()
10430: submitMasterGovBrPdf()
10451: submitDriverGovBrPdf()
10470: loadGovBrInvitePage()
10541: submitGovBrInvitePdf()
10560: exitGovBrInviteToLogin()
10579: contractPeriodLabel()
10580: contractStatusBadge()
10584: pdfSafeText()
10596: contractPdfFileName()
10605: cwBuildDepositChargeText()
10647: cwBuildDepositClauseText()
10659: lcClauseStart()
10666: buildDefaultClauses()
10737: generateContractPdfBytes()
10756: drawHeader()
10761: newPage()
10768: ensureSpace()
10771: wrapLines()
10795: drawJustifiedLine()
11061: renderContractsTab()
11115: renderDriverRentalContractsBox()
11174: openContractForDriver()
11181: *WIZARD DE CRIAÇÃO / EDIÇÃO DE RASCUNHO / RENOVAÇÃO*
11183: closeContractWizard()
11184: cwPopulateSelects()
11192: cwPopulateLocadores()
11204: cwOnLocadorChange()
11213: defaultWitness1ForLocador()
11221: cwApplyDefaultWitness1()
11234: cwFillLocador()
11243: cwFillDepositFromDriver()
11271: cwFillDepositFromComercial()
11293: cwSyncClauseIdx()
11302: cwSyncDepositClauseOnly()
11303: cwUpdateTrialPreview()
11319: cwDepCalc()
11364: cwApplyDriverContractDefaults()
11381: cwFillDriver()
11400: cwUpdateCrlvBar()
11409: cwNeedsCrlvFill()
11413: cwRefreshMissingBoxIfVisible()
11422: cwReadVehicleCrlv()
11471: cwReadCurrentVehicleCrlv()
11477: cwFillVehicle()
11499: cwOnDriverChange()
11515: cwOnVehicleChange()
11528: cwDefaultChecklist()
11533: cwToggleVistoriaFields()
11538: cwRenderInspChecklist()
11557: cwRenderInspDamagesSummary()
11571: cwRenderInspPhotos()
11608: cwUpdateInspPhotoDamage()
11616: cwSyncVistoriaFromVehicle()
11633: cwImportSavedPhotos()
11649: cwUploadInspPhotos()
11689: cwAnalyzeInspWithAI()
11698: cwReadSnapshot()
11757: cwRenderClausesEditor()
11767: cwRebuildClauses()
11775: cwRenderPreview()
11830: cwTogglePreview()
11835: validateContractForEmission()
11852: openContractWizard()
11988: cwSyncSources()
12043: logContractHistory()
12052: persistContract()
12143: saveContractDraft()
12144: emitContract()
12146: ensureContractPdfBlob()
12157: downloadContractPdf()
12169: printContractPdf()
12182: *MODAL DETALHE, ASSINATURAS, UPLOAD ASSINADO, RENOVAR, ENCERRAR, CANCELAR*
12183: closeContractDetail()
12184: openContractDetail()
12257: saveContractSignatures()
12284: uploadSignedContractFile()
12306: terminateContractPrompt()
12321: clearDriverPathsIfMatching()
12331: cancelContractPrompt()
12347: deleteContractPrompt()
12402: inspectionTypeBadge()
12406: inspectionStatusBadge()
12410: inspectionPdfFileName()
12417: switchContractsSubtab()
12430: renderInspectionsTab()
12490: *ANALISADOR DE IA EM LOTE + CONFIRMAÇÃO PRESENCIAL DE DANOS*
12491: runInspectionBatchAI()
12514: promptInspectionDamageConfirmation()
12592: processInspectionPhotosWithAI()
12648: analyzeSavedInspectionPhotos()
12664: renameInspectionPhoto()
12680: *WIZARD DE TERMO DE VISTORIA (ENTREGA E DEVOLUÇÃO)*
12683: closeInspectionWizard()
12684: openInspectionWizard()
12751: iwCollectSavedPhotosFor()
12784: iwPopulateContractsAndBase()
12807: iwSyncHeaderAndLegal()
12819: iwOnTypeChange()
12825: iwOnVehicleChange()
12843: iwOnDriverChange()
12848: iwOnContractChange()
12855: iwImportSavedPhotos()
12866: iwUploadPhotos()
12919: iwResolveEntregaBaseline()
12940: iwRunAIOnList()
12966: iwAnalyzeWithAI()
12973: iwRenderPhotos()
13012: iwUpdatePhotoField()
13017: iwUpdatePhotoDamage()
13025: iwRemovePhoto()
13031: iwRenderDamagesSummary()
13046: iwRenderComparison()
13065: iwRenderChecklist()
13084: persistInspectionTerm()
13187: saveInspectionDraft()
13188: emitInspectionTerm()
13190: *GERADOR DE PDF A4 DE VISTORIA E DEVOLUÇÃO (com grid real de fotos)*
13191: blobToEmbeddableJpeg()
13221: embedBlobIntoPdf()
13234: generateInspectionPdfBytes()
13434: ensureInspectionPdfBlob()
13444: downloadInspectionPdf()
13456: printInspectionPdf()
13469: *MODAL DETALHE E ASSINATURAS DO TERMO DE VISTORIA*
13470: closeInspectionDetail()
13471: openInspectionDetail()
13531: saveInspectionSignatures()
13557: uploadSignedInspectionFile()
13579: cancelInspectionPrompt()

## sw.js (61 linhas)

(sem itens)

## robo-whatsapp/nucleo.js (784 linhas)

26: mascarar()
29: numeroBR()
35: empacotar()
45: credsValido()
50: abrirPacote()
64: abrirConteudo()
74: textoDe()
83: contatoOculto()
86: novoIdRobo()
87: ehDoRobo()
90: numeroDoJid()
92: soBrasil()
95: organizarPix()
102: criarRobo()
105: hora()
106: log()
116: pareado()
117: limparLocal()
119: motoraBruto()
130: motora()
136: avisarErroPareamento()
138: *conexão guardada no Supabase*
139: existeGuardada()
140: restaurar()
174: guardar()
202: agendarBackup()
208: *conexão com o WhatsApp*
209: agendarAbrir()
214: backoff()
219: falhaAoAbrir()
221: soltarSocket()
228: abrir()
259: *conversa que já existia (pedido do dono, 04/11/2026)*
263: aoHistorico()
271: conversaAntiga()
283: aoMudar()
312: esquecerConexao()
318: aoCair()
334: reabrirQr()
359: *conectar pelo número*
360: verificarPareamento()
401: *fila de envio*
403: mandar()
414: conteudoDe()
421: enviar()
438: enviarCopias()
460: marcarEnviada()
467: verReinicio()
478: sinalDeVida()
491: ciclo()
526: *mensagens recebidas (comprovante de motorista e resposta do dono)*
529: aoReceber()
536: telefoneDe()
545: avisarArquivoSemNumero()
552: comRepeticao()
560: responder()
565: tratarRecebida()
622: *atendimento de número desconhecido (saudação, aviso à Dara e conversa intermediada)*
624: destino()
632: encaminhar()
637: ouvirDono()
649: entregarAtendimento()
674: pessoaRespondeu()
687: chamarDara()
710: cicloAtendimento()
715: receberArquivo()
734: *página do QR*
735: pagina()
749: *laços*
750: repetir()
757: iniciar()
768: encerrar()

## robo-whatsapp/robo.js (28 linhas)

(sem itens)

## supabase/functions/motora-asaas/index.ts (656 linhas)

22: serviceKey()
29: json()
31: brl()
32: r2()
36: secret()
41: asaas()
54: avisar()
64: hojeBR()
65: proximoDia()
72: proximaParcela()
83: cauParcela()
92: ajusteVale()
95: tirarAjustes()
103: getAtrasoConfig()
107: atrasoDataBR()
112: atrasoPrazoUtil()
119: calcEncargosAtraso()
137: ehLinhaEncargo()
139: cobrarMotorista()
152: *valores (mesma regra do Novo Pix)*
180: *QR code Pix estático com o valor da semana (sem taxa até 100 Pix/mês)*
183: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
204: criarQrAsaasEUpload()
227: saldoAbertoMotorista()
287: salvarQrParcialNoPerfil()
298: atualizarQrAtrasoMotorista()
332: cobrarTodos()
363: *pagamento recebido*
364: quemPagou()
387: pagamentoRecebido()
477: usuarioAuth()
486: ehMaster()
491: pixParcialMotorista()
550: autorizarParcial()
591: preparar()
592: limpa()
627: acao "pix_parcial"
630: acao "autorizar_parcial"
635: acao "preparar"
638: acao "atualizar_atraso"
649: acao "cobrar"

## supabase/functions/motora-assinatura/index.ts (541 linhas)

7: serviceKey()
27: json()
47: maskCpf()
53: inspectPdfSignatures()
77: makeToken()
84: resolveDoc()
91: publicDocSummary()
128: authUser()

## supabase/functions/motora-assistente/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-assistente/index.ts (93 linhas)

7: serviceKey()
18: json()
20: secret()
24: ehMaster()
32: regrasDono()
38: s()
39: n()
52: instrucoes()

## supabase/functions/motora-backup/index.ts (99 linhas)

10: serviceKey()
16: json()
24: secret()
29: lerTabela()

## supabase/functions/motora-codigo/index.ts (113 linhas)

7: serviceKey()
13: json()
14: secret()
18: guarda()
22: gh()
27: shaArq()
28: textoEm()
29: b64()
33: aplica()
46: palavraCerta()

## supabase/functions/motora-dono/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-dono/index.ts (471 linhas)

9: serviceKey()
15: json()
16: secret()
22: brl()
23: hoje()
24: diaBR()
25: fmtDia()
26: norm()
27: dataOk()
28: num()
29: veicTxt()
30: dig()
39: opcoes()
46: dados()
56: distribui()
66: soma()
69: formaPagar()
98: *as ferramentas: consultar_* respondem; propor_* devolvem {pedido} e nada é gravado aqui*
99: ferramenta()
102: carroDe()
103: umMotorista()
104: umCarro()
127: s()
168: pede()
242: mudaExtra()
247: falha()
248: executar()
292: s()
293: obj()
322: instrucoes()
339: lerDecisao()
341: aparar()
346: salvar()
349: atender()
412: *áudio: a IA ouve o dono e responde falando (sempre com modelos alternativos). A palavra secreta nunca vale por áudio*
413: transcreve()
418: fala()
435: mp3()

## supabase/functions/motora-lembretes/index.ts (367 linhas)

15: serviceKey()
21: json()
22: brl()
28: cauParcela()
37: ajusteVale()
40: tirarAjustes()
46: secret()
51: hojeBR()
52: diaBR()
53: proximoDia()
60: previsao()
74: formaAuto()
76: avisoDono()
101: avisoMotorista()
124: r2()
125: atrasoDataBR()
130: atrasoPrazoUtil()
137: calcEncargosAtraso()
155: ehLinhaEncargo()
158: emAberto()
181: avisoAtraso()
204: **4) PIX AUTOMÁTICO DO MOTORA**
206: crc16()
211: campo()
212: txtPix()
213: codigoPix()
220: chaveNormal()
227: proximaParcela()
235: pixAutomatico()
242: *valores (mesma regra do Novo Pix e do Asaas)*
269: *atualiza o motorista (o banco cria o histórico e a data de pagamento sozinho)*
290: pixAutoTodos()
314: enviar()
323: lembrar()

## supabase/functions/motora-ler-veiculos/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-ler-veiculos/index.ts (58 linhas)

6: serviceKey()
12: json()
13: secret()
35: aceita()
43: norm()

## supabase/functions/motora-push/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-push/index.ts (443 linhas)

12: serviceKey()
23: json()
25: secret()
31: vapid()
45: copiaWhatsAppDono()
55: sendTo()
75: masterIds()
80: fmtDue()
84: fmtDia()
87: safeUrl()
89: **ÁREA IA (mensagens de WhatsApp)**
90: brl()
92: pixKey()
99: setting()
103: iaAtiva()
105: roboFuncionando()
111: baseMessage()
115: textoNovoPix()
122: regrasDono()
127: lerMensagem()
136: iaEscreve()
153: iaReescreveTodos()
167: motoristasDoAviso()
173: reciboDados()
198: gerarPdfRecibo()
202: limpa()
222: queueWhatsApp()
247: norm()
270: **fim da Área IA**
276: textoBoasVindas()
300: sendToDriver()
313: type "public_key"
322: type "sunday"
330: type "recibo_teste"
334: type "master_alert"
338: type "driver_alert"
350: type "test"
358: type "aprovar_msg"
369: type "todos_rascunho"
377: type "todos_enviar"
387: type "new_pix"
399: type "boas_vindas"
414: type "cobranca"

## supabase/functions/motora-qr-asaas/index.ts (28 linhas)

5: serviceKey()
11: json()

## supabase/functions/motora-robo/comandos.ts (226 linhas)

3: chaveFone()
10: chaveContato()
18: lerComando()
23: norm()
27: escolher()
32: nomeNoInicio()
41: lista()
54: extensao()
63: *atendimento de número desconhecido*
64: foneBonito()
73: primeiroNome()
76: saudacao()
82: textoDara()
86: promptDara()
98: lerMensagemIA()
107: avisoDaraValido()
112: *a IA tira dúvidas de quem quer alugar, só com os dados do app*
114: reais()
116: ofertaVeiculo()
123: promptCliente()
138: lerRespostaCliente()
148: valoresConferem()
155: textoDaraSim()
159: lerDecisao()
165: promptResumo()
170: lerResumo()
178: *urgência da mensagem do motorista: quanto mais urgente, mais rápido chama a Dara*
184: nivelPorPalavras()
191: promptNivel()
201: lerNivel()
210: textoDaraMotorista()
216: escolherConversa()

## supabase/functions/motora-robo/gemini.ts (49 linhas)

6: modelosGemini()

## supabase/functions/motora-robo/index.ts (461 linhas)

15: serviceKey()
21: json()
24: secret()
29: ehDono()
34: motoristaDoFone()
43: nivelDaMensagem()
56: resumoDe()
67: respostaCliente()
80: aceita()
86: falaCliente()
92: avisoDara()
96: aceita()
110: acao "pendentes"
121: conta()
148: acao "freio"
158: acao "enviada"
164: acao "falhou"
176: *mensagens RECEBIDAS: só valem com o envio automático ligado*
179: *número desconhecido: saúda, em 3 min sem resposta chama a Dara e intermedia a conversa*
181: rotulo()
182: acao "atendimento"
305: acao "audio_dono"
310: acao "locadora_respondeu"
316: acao "atendimento_fila"
347: acao "atendimento_ok"
356: acao "atendimento_falhou"
361: acao "mensagem"
385: acao "comprovante_url"
404: acao "comprovante_salvar"
414: acao "comprovante_sem_numero"
419: acao "qr"
426: acao "parear_ver"
430: acao "parear_codigo"
437: acao "sessao_existe"
441: acao "sessao_enviar"
446: acao "sessao_baixar"
451: acao "sessao_apagar"

## supabase/functions/motora-sync/index.ts (573 linhas)

5: serviceKey()
17: json()
19: secret()
24: readFile()
33: drive()
42: stamp()
44: driverInfo()
50: syncDoc()
58: uploadReceipt()
66: syncPix()
78: syncExpense()
91: *DOCUMENTOS DO VEÍCULO, VISTORIA E TERMOS (envio automático ao Drive)*
92: vehicleInfo()
98: syncVehicleDoc()
105: syncInspection()
113: escHtml()
114: syncTerms()
129: *fim*
131: *E-MAIL: a IA escreve, o dono confere no app e confirma o envio*
132: regrasDono()
137: emailDraft()
155: sendEmail()
163: *fim do e-mail*
165: **LEITURA DE DOCUMENTOS E VISTORIA COM IA (Gemini)**
168: modelosGemini()
184: callGemini()
238: expensePrompt()
246: earningPrompt()
258: callGeminiDriver()
260: aiReadFiles()
273: aiAnalyzeInspection()
314: driverWelcome()
329: *CONFERÊNCIA DE COMPROVANTE COM IA*
336: geminiOnFiles()
346: nameWords()
350: brl()
351: dBR()
353: pushAlert()
362: notifyMasters()
363: notifyDriver()
365: verifyReceipt()
372: save()
421: checkDriverCnh()
436: dig()
457: driverCnhCheck()
467: dig()
492: aiRead()
514: type "doc"
515: type "receipt"
516: type "pix"
517: type "expense"
518: type "vehicle_doc"
519: type "inspection"
520: type "terms"
521: type "verify_receipt"
522: type "driver_cnh"
531: type "driver_cnh_check"
534: type "ai_read"
535: type "verify_receipt"
536: type "ai_read_files"
541: type "ai_analyze_inspection"
546: type "driver_welcome"
547: type "email_draft"
548: type "send_email"
550: type "drive_ping"
551: type "drive_resync"

## SQL aplicado no Supabase (supabase/*.sql)

- supabase/2026-11-01-novidades.sql: MOTORA — novidades de 01/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-asaas-config.sql: MOTORA — 02/11/2026 (APLICADO em 02/11/2026)
- supabase/2026-11-02-periodo-cobranca.sql: MOTORA — período, vencimento e correção de recibo por cobrança (02/11/2026)
- supabase/2026-11-03-atendimento.sql: Atendimento de número desconhecido pelo robô (só o robô usa, pela função motora-robo)
- supabase/2026-11-03-atraso.sql: MOTORA — 03/11/2026 (APLICADO)
- supabase/2026-11-03-checa-robo.sql: Checagem do robô a cada 30 s: avisa o dono uma vez quando para e outra quando volta
- supabase/2026-11-03-devolucao-aprovar.sql: Depois do botão de devolução, nenhuma mensagem sai para o motorista sem a aprovação do dono
- supabase/2026-11-03-dono-assistente.sql: Conversa do dono com a IA pelo WhatsApp e o pedido que espera o SIM. Só as funções do servidor leem e gravam.
- supabase/2026-11-03-ia-codigo.sql: Palavra secreta e chave do GitHub da IA do dono: só o master grava; ninguém lê pelo app. A palavra fica só como resumo (hash).
- supabase/2026-11-03-ia-ganhos-app.sql: A IA do WhatsApp (motora-dono) grava ganhos e despesas de aplicativo depois do SIM do dono
- supabase/2026-11-03-lembretes.sql: MOTORA — 03/11/2026 (APLICADO em 03/11/2026)
- supabase/2026-11-03-whatsapp-dono.sql: WhatsApp do dono: avisos do master no número dele e confirmação de comprovante por resposta.
- supabase/2026-11-04-ar-avisos-grafico.sql: Ar-condicionado: histórico do quarto (gráfico) e avisos no celular. Só mexe na área "ar".
- supabase/2026-11-04-ar-condicionado.sql: Ar-condicionado (Gree ESP32): área isolada "ar" no projeto motora. Não toca nas tabelas do MOTORA.
- supabase/2026-11-04-conversa-antiga.sql: Conversa que já existia (04/11/2026, já aplicado): número que não é motorista e já conversava com a locadora
- supabase/2026-11-04-pix-automatico.sql: Pix automático do MOTORA e lembrete do meio-dia (já aplicado em 04/11/2026)
- supabase/2026-11-10-qr-asaas-whatsapp.sql: Mensagem de Pix de motorista no Asaas leva a imagem do QR code criada pelo Asaas (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-remove-picpay.sql: PicPay retirado do MOTORA (10/11/2026). Já aplicado no banco.
- supabase/2026-11-10-seguranca.sql: Segurança (10/11/2026). Já aplicado no banco.
- supabase/2026-11-12-atraso-juros-asaas.sql: MOTORA — 12/11/2026: Juros e multa por inadimplência alinhados ao Asaas (10% multa + 2% ao mês pro rata die, QR estático sem tarifa)
- supabase/2026-11-12-caucao-valor-contrato.sql: Inclui o valor pago de caução no encerramento de contrato e na mensagem ao motorista
- supabase/2026-11-12-contrato-caucao-arquivo.sql: Contagem de 30 dias da caução após encerramento do contrato + "Caução pago" e arquivamento da ficha
- supabase/2026-11-12-contrato-parcial-financeiro.sql: MOTORA: vincula histórico de Pix ao veículo, adiciona encerramento de contrato e atualização segura de QR parcial (Asaas)
- supabase/2026-11-12-modulo-contratos.sql: Módulo de Contratos de Locação (12/11/2026)
- supabase/2026-11-12-modulo-vistorias.sql: Módulo Unificado de Vistorias Veiculares e Devolução com IA (12/11/2026)
- supabase/2026-11-13-govbr-assinaturas.sql: Fluxo oficial de assinaturas eletrônicas via Portal GOV.BR (assinador.iti.br)
